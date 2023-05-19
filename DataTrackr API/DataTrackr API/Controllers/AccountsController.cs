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
using Microsoft.AspNetCore.Authorization;
using Microsoft.Identity.Web.Resource;
using DataTrackr_API.Models;
using AutoMapper.QueryableExtensions;

namespace DataTrackr_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]

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
        //[HttpGet]
        //public async Task<ActionResult<IEnumerable<GetAccountDto>>> GetAccounts()
        //{
        //    var accounts = await _context.Accounts.Include(q=>q.Location).ToListAsync();
        //    var records = _mapper.Map<List<GetAccountDto>>(accounts);
       
        //    return Ok(records);
        //}

        // GET: api/Accounts/fetchAccounts?StartIndex=0&PageSize=25&PageNumber=1 (Paginated)
        [HttpGet]
        [Route("/api/Accounts$fetch")]
        public async Task<ActionResult<PagedResult<GetAccountDto>>> GetPagedAccounts([FromQuery] QueryParameters queryParameters)
        {
            var totalSize = await _context.Accounts.Where(d => d.Customer_email == queryParameters.CustomerEmail).CountAsync();
            var items = await _context.Accounts
                .Where(d=>d.Customer_email==queryParameters.CustomerEmail)
                .Skip(queryParameters.StartIndex)
                .Take(queryParameters.PageSize)
                .ProjectTo<GetAccountDto>(_mapper.ConfigurationProvider)
                .ToListAsync();
            var pagedAccountsResult= new PagedResult<GetAccountDto>
            {
                Items = items,
                PageNumber = queryParameters.PageNumber,
                RecordNumber = queryParameters.PageSize,
                TotalCount = totalSize
            };
            return Ok(pagedAccountsResult);
        }

        // GET: api/Accounts$like?search=sagar
        [HttpGet]
        [Route("/api/Accounts$like")]
        public async Task<ActionResult<IEnumerable<GetAccountDto>>> SearchAccounts([FromQuery] string search)
        {
            var accounts = await _context.Accounts.Include(q => q.Location).Where(d=>d.aname.Contains(search)
            || d.description.Contains(search) || d.EstYear.Contains(search) || d.Location.address.Contains(search)).ToListAsync();
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
        public async Task<IActionResult> PutAccount(string id, UpdateAccountDetailDto updateAccount)
        {
            var currentaccount = await _context.Accounts.FirstOrDefaultAsync(q => q.Acc_email == id);
            if (id != updateAccount.Acc_email)
            {
                return BadRequest();
            }

            if (currentaccount == null)
            {
                return NotFound();
            }
            //_mapper.Map(updateAccount, account);

            var coordinateId = currentaccount.coordinateId;

            var currentLocation = await _context.Coordinates.FirstOrDefaultAsync(q => q.coordinateId == coordinateId);

            currentaccount.aname = updateAccount.aname;
            currentaccount.EstYear = updateAccount.EstYear;
            currentaccount.description = updateAccount.description;

            currentLocation.latitude = updateAccount.Location.latitude;
            currentLocation.longitude = updateAccount.Location.longitude;
            currentLocation.address = updateAccount.Location.address;


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
            var currentAccount = await _context.Accounts.Include(a => a.Location).FirstOrDefaultAsync(a => a.Acc_email == createAccountDto.Acc_email);
            
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
            var account = await _context.Accounts.Include(l=>l.Location).FirstOrDefaultAsync(q=>q.Acc_email==id);
            var coordinateId = account.coordinateId;
            var location = await _context.Coordinates.FirstOrDefaultAsync(q => q.coordinateId == coordinateId);

            if (account == null)
            {
                return NotFound();
            }
            _context.Accounts.Remove(account);
            _context.Coordinates.Remove(location);

            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool AccountExists(string id)
        {
            return _context.Accounts.Any(e => e.Acc_email == id);
        }
    }
}
