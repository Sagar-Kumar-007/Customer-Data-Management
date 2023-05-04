using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
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
        public async Task<ActionResult<IEnumerable<Logs>>> GetLogs()
        {
            return await _context.Logs.ToListAsync();
        }

        // Search

        // GET: api/Logs
        [HttpGet]
        [Route("/api/Logs$like")]
        public async Task<ActionResult<IEnumerable<Logs>>> SearchLogs([FromQuery] string search)
        {
            return Ok(await _context.Logs.Where(d => d.userId.Contains(search) || d.message.Contains(search) || d.operation.Contains(search) || d.timeStamp.Contains(search)).ToListAsync());
        }

        // GET: api/Logs/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Logs>> GetLogs(int id)
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
        public async Task<ActionResult<Logs>> PostLogs(Logs logs)
        {
            _context.Logs.Add(logs);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetLogs", new { id = logs.logId }, logs);
        }

        

        private bool LogsExists(int id)
        {
            return _context.Logs.Any(e => e.logId == id);
        }
    }
}
