using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DataTrackr_API.Models;
using DataTrackr_Web_API.Models;

namespace DataTrackr_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LogsController : ControllerBase
    {
        private readonly ApiDbContext _context;

        public LogsController(ApiDbContext context)
        {
            _context = context;
        }

        // GET: api/Logs
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Log>>> GetLogs()
        {
            return await _context.Logs.ToListAsync();
        }

        // GET: api/Logs/fetchAccounts?StartIndex=0&PageSize=25&PageNumber=1 (Paginated)
        [HttpGet]
        [Route("/api/Logs$fetch")]
        public async Task<ActionResult<PagedResult<Log>>> GetPagedAccounts([FromQuery] QueryParameters queryParameters)
        {
            var totalSize = await _context.Logs.CountAsync();
            var items = await _context.Logs
                .OrderByDescending(x => x.LogId)
                .Skip(queryParameters.StartIndex)
                .Take(queryParameters.PageSize)
                .ToListAsync();
            var pagedAccountsResult = new PagedResult<Log>
            {
                Items = items,
                PageNumber = queryParameters.PageNumber,
                RecordNumber = queryParameters.PageSize,
                TotalCount = totalSize
            };
            return Ok(pagedAccountsResult);
        }


        // Search

        // GET: api/Logs
        [HttpGet]
        [Route("/api/Logs$like")]
        public async Task<ActionResult<IEnumerable<Log>>> SearchLogs([FromQuery] string search)
        {
            return Ok(await _context.Logs.OrderByDescending(x=>x.LogId).Where(d => d.UserId.Contains(search) || d.Message.Contains(search) || d.Operation.Contains(search) || d.TimeStamp.Contains(search)).ToListAsync());
        }

        // GET: api/Logs/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Log>> GetLogs(int id)
        {
            var logs = await _context.Logs.FindAsync(id);

            if (logs == null)
            {
                return NotFound();
            }

            return logs;
        }

        
        // POST: api/Logs
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Log>> PostLogs(Log logs)
        {
            _context.Logs.Add(logs);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetLogs", new { id = logs.LogId }, logs);
        }
    }
}
