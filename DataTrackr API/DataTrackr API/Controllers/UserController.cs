//using DataTrackr_API.Helpers;
//using DataTrackr_API.Models;
//using DataTrackr_Web_API.Models;
//using Microsoft.AspNetCore.Http;
//using Microsoft.AspNetCore.Mvc;
//using Microsoft.DotNet.Scaffolding.Shared.Messaging;
//using Microsoft.EntityFrameworkCore;
//using System;
//using System.Text;
//using System.Text.RegularExpressions;
//using System.Threading.Tasks;

//namespace DataTrackr_API.Controllers
//{
//    [Route("api/User")]
//    [ApiController]
//    public class UserController : ControllerBase
//    {
//        private readonly ApiDbContext _authContext;
//        public UserController(ApiDbContext apiDbContext)
//        {
//            _authContext = apiDbContext;
//        }

//        [HttpPost("authenticate")]

//        public async Task<IActionResult> Authenticate([FromBody] User userObj)
//        {
//            if (userObj == null)
//            {
//                return BadRequest();
//            }
//            var user = await _authContext.Users
//                .FirstOrDefaultAsync(x => x.Username == userObj.Username && x.Password == userObj.Password);

//            if (user == null)
//            {
//                return NotFound(new { Message = "User Not Found !" });
//            }
//            return Ok(new
//            {
//                Message = "Login Success!"
//            });
//        }

//        [HttpPost("register")]
//        public async Task<IActionResult> RegisterUser([FromBody] User userObj)
//        {
//            if (userObj == null)
//            {
//                return BadRequest();
//            }

//            //check UserName

//            if (await CheckUserNameExistAsync(userObj.Username))
//            {
//                return BadRequest(new { Message = "Username Already Exist!" });
//            }

//            //check Email

//            if (await CheckEmailExistAsync(userObj.Email))
//            {
//                return BadRequest(new { Message = "Email Already Exist!" });
//            }

//            //Check password Strngth

//            var password = CheckPasswordStrength(userObj.Password);
//            if (!string.IsNullOrEmpty(password))
//            {
//                return BadRequest(new { Message = password.ToString() });
//            }


//            userObj.Password = PasswordHasher.HashPassword(userObj.Password);
//            userObj.Role = "User";
//            userObj.Token = "";

//            await _authContext.Users.AddAsync(userObj);
//            await _authContext.SaveChangesAsync();
//            return Ok(new
//            {
//                Message = "User Registered !"
//            });
//        }

//        private Task<bool> CheckUserNameExistAsync(string username)
//       => _authContext.Users.AnyAsync(x => x.Username == username);

//        private Task<bool> CheckEmailExistAsync(string email)
//      => _authContext.Users.AnyAsync(x => x.Email == email);

//        public string CheckPasswordStrength(string password)
//        {
//            StringBuilder sb = new StringBuilder();

//            if (password.Length < 8)
//            {
//                sb.Append("Minimum password length should be 8" + Environment.NewLine);
//            }
//            if (!(Regex.IsMatch(password, "[a-z]") && Regex.IsMatch(password, "[A-Z]")
//                && Regex.IsMatch(password, "[0-9]")))
//            {
//                sb.Append("Password should be Alphanumeric" + Environment.NewLine);
//            }
//            if (!Regex.IsMatch(password, "[!, @, #, $, %, ^, &, *, (, ), -, _, +, =, {, }, [, ], |, , :, ;, \", ', <, >, ?, /, ., `, ~]"))
//            {
//                sb.Append("Password should contain special characters" + Environment.NewLine);
//            }
//            return sb.ToString();
//        }

//    }
//}



using DataTrackr_API.Helpers;
using DataTrackr_API.Models;
using DataTrackr_Web_API.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.DotNet.Scaffolding.Shared.Messaging;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace DataTrackr_API.Controllers
{
    [Route("api/User")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly ApiDbContext _authContext;
        public UserController(ApiDbContext apiDbContext)
        {
            _authContext = apiDbContext;
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

            if(!PasswordHasher.VerifyPassword(userObj.Password,user.Password))
            {
                return BadRequest(new { Message = "Password is Incorrect" });
            }
            user.Token = CreateJwt(user);
            return Ok(new
            {
                Token=user.Token,
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
            userObj.Role = "User";
            userObj.Token = "";

            await _authContext.Users.AddAsync(userObj);
            await _authContext.SaveChangesAsync();
            return Ok(new
            {
                Message = "User Registered !"
            });
        }


        [HttpGet]
        
        public async Task<ActionResult<User>>GetAllUsers()
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
                new Claim(ClaimTypes.Role,user.Role),
                new Claim(ClaimTypes.Name,$"{user.FirstName} {user.LastName}")
            });

            var credentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = identity,
                Expires = DateTime.Now.AddDays(1),
                SigningCredentials = credentials
            };

            var token = jwtTokenHandler.CreateToken(tokenDescriptor);
            return jwtTokenHandler.WriteToken(token);
        }
    
    }
}