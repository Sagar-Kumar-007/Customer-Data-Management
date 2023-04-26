using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DataTrackr_Web_API.Models;
using AutoMapper;
using DataTrackr_API.DTO.Account;
using DataTrackr_API.DTO.Customer;
using Microsoft.CodeAnalysis;

namespace DataTrackr_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountsController : ControllerBase
    {
        private readonly ApiDbContext _context;
        private readonly IMapper _mapper;

        public AccountsController(ApiDbContext context, IMapper mapper)
        {
            _context = context;
            this._mapper = mapper;
        }

        // GET: api/Accounts
        [HttpGet]
        public async Task<ActionResult<IEnumerable<GetAccountDto>>> GetAccounts()
        {
            var accounts = await _context.Accounts.Include(q=>q.Location).ToListAsync();
            var records = _mapper.Map<List<GetAccountDto>>(accounts);
       
            return Ok(records);
        }

        // GET: api/Accounts/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Account>> GetAccount(string id)
        {
            var account = await _context.Accounts.Include(q => q.Location).FirstOrDefaultAsync(q=> q.Acc_email==id);
          

            if (account == null)
            {
                return NotFound();
            }
            var accountDetailsDto = _mapper.Map<GetAccountDto>(account);
            return Ok(accountDetailsDto);
        }

        // PUT: api/Accounts/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAccount(string id, UpdateAccountDetailDto updateAccountDto)
        {
            if (id != updateAccountDto.Acc_email)
            {
                return BadRequest();
            }

            //_context.Entry(account).State = EntityState.Modified;
            var account = await _context.Accounts.FindAsync(id);
            if (account == null)
            {
                return NotFound();
            }
            _mapper.Map(updateAccountDto, account);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AccountExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Accounts
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Account>> PostAccount(CreateAccountDto createAccountDto)
        {
            var account = _mapper.Map<Account>(createAccountDto);
            _context.Accounts.Add(account);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (AccountExists(account.Acc_email))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetAccount", new { id = account.Acc_email }, account);
        }

        // DELETE: api/Accounts/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAccount(string id)
        {
            var account = await _context.Accounts.FindAsync(id);
            if (account == null)
            {
                return NotFound();
            }

            _context.Accounts.Remove(account);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool AccountExists(string id)
        {
            return _context.Accounts.Any(e => e.Acc_email == id);
        }
    }
}
