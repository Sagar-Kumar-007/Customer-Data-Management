using DataTrackr_API.Models;
using DataTrackr_Web_API.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.DotNet.Scaffolding.Shared.Messaging;
using Microsoft.EntityFrameworkCore;
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
            if(userObj==null)
            {
                return BadRequest();
            }
            var user = await _authContext.Users
                .FirstOrDefaultAsync(x => x.Username == userObj.Username && x.Password == userObj.Password);

            if(user==null)
            {
                return NotFound(new { Message = "User Not Found !" });
            }
            return Ok(new
            {
                Message="Login Success!"
            });
        }

        [HttpPost("register")]
        public async Task<IActionResult> RegisterUser([FromBody]User userObj)
        {
            if(userObj ==null)
            {
                return BadRequest();
            }
            await _authContext.Users.AddAsync(userObj);
            await _authContext.SaveChangesAsync();
            return Ok(new
            {
                Message="User Registered !"
            });
        }
    }
}
