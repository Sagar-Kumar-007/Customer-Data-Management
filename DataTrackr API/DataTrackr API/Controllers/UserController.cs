using DataTrackr_API.DTO.ResetPassword;
using DataTrackr_API.Helpers.UtilityService;
using DataTrackr_API.Models;
using DataTrackr_Web_API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Policy;
using System.Text.RegularExpressions;
using System.Text;
using System.Threading.Tasks;
using System;
using DataTrackr_API.Helpers;

namespace DataTrackr_API.Controllers
{
    [Route("api/User")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly ApiDbContext _authContext;
        private readonly IConfiguration _configuration;
        private readonly IEmailService _emailService;
        public UserController(ApiDbContext apiDbContext, IConfiguration configuration, IEmailService emailService)
        {
            _authContext = apiDbContext;
            _configuration = configuration;
            _emailService = emailService;
        }

        [HttpPost("authenticate")]

        public async Task<IActionResult> Authenticate([FromBody] User userObj)
        {
            if (userObj == null)
            {
                return BadRequest();
            }
            var user = await _authContext.Users
                .FirstOrDefaultAsync(x => x.Username == userObj.Username);

            if (user == null)
            {
                return NotFound(new { Message = "User Not Found !" });
            }

            if (!PasswordHasher.VerifyPassword(userObj.Password, user.Password))
            {
                return BadRequest(new { Message = "Password is Incorrect" });
            }
            user.Token = CreateJwt(user);

            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.ReadToken(user.Token) as JwtSecurityToken;
            var expirationTime = token.ValidTo;
            var currentTime = DateTime.UtcNow;

            if (currentTime > expirationTime)
            {
                Console.WriteLine("Token has expired!");
            }
            return Ok(new
            {
                Token = user.Token,
                Message = "Login Success!"
            });
        }

        [HttpPost("register")]
        public async Task<IActionResult> RegisterUser([FromBody] User userObj)
        {
            if (userObj == null)
            {
                return BadRequest();
            }
            //check UserName

            if (await CheckUserNameExistAsync(userObj.Username))
            {
                return BadRequest(new { Message = "Username Already Exist!" });
            }

            //check Email

            if (await CheckEmailExistAsync(userObj.Email))
            {
                return BadRequest(new { Message = "Email Already Exist!" });
            }

            //Check password Strngth

            var password = CheckPasswordStrength(userObj.Password);
            if (!string.IsNullOrEmpty(password))
            {
                return BadRequest(new { Message = password.ToString() });
            }

userObj.Password = PasswordHasher.HashPassword(userObj.Password);
            userObj.Token = "";

            await _authContext.Users.AddAsync(userObj);
            await _authContext.SaveChangesAsync();
            return Ok(new
            {
                Message = "User Registered !"
            });
        }

        [Authorize]
        [HttpGet]

        public async Task<ActionResult<User>> GetAllUsers()
        {
            return Ok(await _authContext.Users.ToListAsync());
        }

        private Task<bool> CheckUserNameExistAsync(string username)
       => _authContext.Users.AnyAsync(x => x.Username == username);

        private Task<bool> CheckEmailExistAsync(string email)
      => _authContext.Users.AnyAsync(x => x.Email == email);

        private string CheckPasswordStrength(string password)
        {
            StringBuilder sb = new StringBuilder();

            if (password.Length < 8)
            {
                sb.Append("Minimum password length should be 8" + Environment.NewLine);
            }
            if (!(Regex.IsMatch(password, "[a-z]") && Regex.IsMatch(password, "[A-Z]")
                && Regex.IsMatch(password, "[0-9]")))
            {
                sb.Append("Password should be Alphanumeric" + Environment.NewLine);
            }
            if (!Regex.IsMatch(password, @"[!@#$%^&*()\-_=+{}\[\]|\\:;\""<>,.?\/`~]"))
            {
                sb.Append("Password should contain special characters" + Environment.NewLine);
            }
            return sb.ToString();
        }

        private string CreateJwt(User user)
        {
            var jwtTokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes("veryverysecret....");

            var identity = new ClaimsIdentity(new Claim[]               //Payload
            {
                new Claim(ClaimTypes.Name,$"{user.FirstName} {user.LastName}"),
                new Claim(ClaimTypes.Email,user.Email)
            });

            var credentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = identity,
                Expires = DateTime.Now.AddMinutes(30),
                SigningCredentials = credentials
            };

            var token = jwtTokenHandler.CreateToken(tokenDescriptor);
            return jwtTokenHandler.WriteToken(token);
        }



        [HttpPost("send-reset-email/{email}")]
        public async Task<IActionResult> SendEmail(string email)
        {
            var user = await _authContext.Users.FirstOrDefaultAsync(a => a.Email == email);

            if (user is null)
            {
                return NotFound(new
                {
                    StatusCode = 404,
                    Message = "email doesn't Exist"
                });
            }
            Random random = new Random();
            string emailToken = random.Next(1000, 10000).ToString();
            Console.WriteLine(user.LastName);
            Console.WriteLine(emailToken);
            user.ResetPasswordToken = emailToken;
            user.ResetPasswordExpiry = DateTime.Now.AddMinutes(15);

            string from = _configuration["EmailSettings:From"];

            var emailModel = new EmailModel(email, "Reset Password !!", EmailBody.EmailStringBody(email, emailToken));

            await _authContext.SaveChangesAsync();
            _emailService.SendEmail(emailModel);

            return Ok(new
            {
                StatusCode = 200,
                Message = "Email Sent!"
            });

        }


        [HttpPost("reset-password")]
        public async Task<IActionResult> ResetPassword(ResetPasswordDto resetPasswordDto)
        {
            var newToken = resetPasswordDto.EmailToken.Replace(" ", "+");
            var user = await _authContext.Users.AsNoTracking().FirstOrDefaultAsync(a => a.Email == resetPasswordDto.Email);

            if (user is null)
            {
                return NotFound(new
                {
                    StatusCode = 404,
                    Message = "User doesn't Exist, try correct email."
                });
            }
            string tokenCode = user.ResetPasswordToken;


            DateTime emailTokenExpiry = user.ResetPasswordExpiry;
            if (tokenCode != resetPasswordDto.EmailToken || emailTokenExpiry < DateTime.Now)
            {
                return BadRequest(new
                {
                    StatusCode = 400,
                    Message = "Security Code doesn't match."
                });
            }
            var newPassword = CheckPasswordStrength(resetPasswordDto.NewPassword);
            if (!string.IsNullOrEmpty(newPassword))
            {
                return BadRequest(new { Message = newPassword.ToString() });
            }

            user.Password = PasswordHasher.HashPassword(resetPasswordDto.NewPassword);
            _authContext.Entry(user).State = EntityState.Modified;
            await _authContext.SaveChangesAsync();
            return Ok(new
            {
                StatusCode = 200,
                Message = "Password Reset Successfully"
            });
        }

    }
}

