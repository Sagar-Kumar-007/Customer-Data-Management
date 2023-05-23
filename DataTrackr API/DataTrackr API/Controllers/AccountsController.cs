using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DataTrackr_Web_API.Models;
using AutoMapper;
using DataTrackr_API.DTO.Account;
using Microsoft.CodeAnalysis;
using Microsoft.AspNetCore.Authorization;
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

        
        // GET: api/Accounts/fetchAccounts?StartIndex=0&PageSize=25&PageNumber=1 (Paginated)
        [HttpGet]
        [Route("/api/Accounts$fetch")]
        public async Task<ActionResult<PagedResult<GetAccountDto>>> GetPagedAccounts([FromQuery] QueryParameters queryParameters)
        {
            var totalSize = await _context.Accounts.Where(d => d.CustomerEmail == queryParameters.CustomerEmail).CountAsync();
            var items = await _context.Accounts
                .Where(d=>d.CustomerEmail==queryParameters.CustomerEmail)
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

        // GET: api/Accounts$like?search=xyz
        [HttpGet]
        [Route("/api/Accounts$like")]
        public async Task<ActionResult<IEnumerable<GetAccountDto>>> SearchAccounts([FromQuery] string search, [FromQuery] string CustomerEmail)
        {
            var accounts = await _context.Accounts.Include(q => q.Location).Where(d=>d.CustomerEmail==CustomerEmail && (d.AccountName.Contains(search)
            || d.Description.Contains(search) || d.EstablishmentYear.Contains(search) || d.Location.Address.Contains(search))).ToListAsync();
            var records = _mapper.Map<List<GetAccountDto>>(accounts);

            return Ok(records);
        }

        // GET: api/Accounts/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Account>> GetAccount(string id)
        {
            var account = await _context.Accounts.Include(q => q.Location).FirstOrDefaultAsync(q=> q.AccountEmail==id);
          

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
        public async Task<IActionResult> UpdateAccount(string id, UpdateAccountDetailDto updateAccount)
        {
            var currentaccount = await _context.Accounts.FirstOrDefaultAsync(q => q.AccountEmail == id);
            if (id != updateAccount.AccountEmail)
            {
                return BadRequest();
            }

            if (currentaccount == null)
            {
                return NotFound();
            }
            //_mapper.Map(updateAccount, account);

            var coordinateId = currentaccount.CoordinateId;

            var currentLocation = await _context.Coordinates.FirstOrDefaultAsync(q => q.CoordinateId == coordinateId);

            currentaccount.AccountName = updateAccount.AccountName;
            currentaccount.EstablishmentYear = updateAccount.EstablishmentYear;
            currentaccount.Description = updateAccount.Description;

            currentLocation.Latitude = updateAccount.Location.Latitude;
            currentLocation.Longitude = updateAccount.Location.Longitude;
            currentLocation.Address = updateAccount.Location.Address;


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

            return Ok(updateAccount);
        }

        // POST: api/Accounts
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Account>> PostAccount(CreateAccountDto createAccountDto)
        {
            var account = _mapper.Map<Account>(createAccountDto);
            var currentAccount = await _context.Accounts.Include(a => a.Location).FirstOrDefaultAsync(a => a.AccountEmail == createAccountDto.AccountEmail);
            
            _context.Accounts.Add(account);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (AccountExists(account.AccountEmail))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetAccount", new { id = account.AccountEmail }, account);
        }

        // DELETE: api/Accounts/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAccount(string id)
        {
            var account = await _context.Accounts.Include(l=>l.Location).FirstOrDefaultAsync(q=>q.AccountEmail==id);
            var coordinateId = account.CoordinateId;
            var location = await _context.Coordinates.FirstOrDefaultAsync(q => q.CoordinateId == coordinateId);

            if (account == null)
            {
                return NotFound();
            }
            _context.Accounts.Remove(account);
            _context.Coordinates.Remove(location);

            await _context.SaveChangesAsync();

            return Ok();
        }

        private bool AccountExists(string id)
        {
            return _context.Accounts.Any(e => e.AccountEmail == id);
        }
    }
}
