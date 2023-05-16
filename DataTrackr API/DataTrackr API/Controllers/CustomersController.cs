using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DataTrackr_Web_API.Models;
using DataTrackr_API.DTO.Country;
using AutoMapper;
using DataTrackr_API.DTO.Customer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Identity.Web.Resource;
using DataTrackr_API.DTO.Account;
using DataTrackr_API.Models;
using AutoMapper.QueryableExtensions;

namespace DataTrackr_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class CustomersController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly ApiDbContext _context;

        public CustomersController(ApiDbContext context, IMapper mapper)
        {
            _context = context;
            this._mapper = mapper;
        }

        // GET: api/Customers
        [HttpGet]
        public async Task<ActionResult<IEnumerable<GetCustomerDto>>> GetCustomers()
        {
            var customers=await _context.Customers.ToListAsync();
            var records = _mapper.Map<List<GetCustomerDto>>(customers);
            return Ok(records);
        }

        // GET: api/Customers/fetchAccounts?StartIndex=0&PageSize=25&PageNumber=1 (Paginated)
        [HttpGet]
        [Route("/api/Customers$fetch")]
        public async Task<ActionResult<PagedResult<GetCustomerDto>>> GetPagedCustomers([FromQuery] QueryParameters queryParameters)
        {
            var totalSize = await _context.Customers.CountAsync();
            var items = await _context.Customers
                .Skip(queryParameters.StartIndex)
                .Take(queryParameters.PageSize)
                .ProjectTo<GetCustomerDto>(_mapper.ConfigurationProvider)
                .ToListAsync();
            var pagedCustomersResult = new PagedResult<GetCustomerDto>
            {
                Items = items,
                PageNumber = queryParameters.PageNumber,
                RecordNumber = queryParameters.PageSize,
                TotalCount = totalSize
            };
            return Ok(pagedCustomersResult);
        }

        // GET: api/Customers$like?search=sagar
        [HttpGet]
        [Route("/api/Customers$like")]
        public async Task<ActionResult<IEnumerable<GetCustomerDto>>> SearchCustomers([FromQuery] string search)
        {
            var customers = await _context.Customers.Where(d => d.cname.Contains(search) || d.CountryCode.Contains(search) || d.Description.Contains(search) || d.sector.Contains(search)).ToListAsync();
            var records = _mapper.Map<List<GetCustomerDto>>(customers);
            return Ok(records);
        }

        // GET: api/Customers/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Customer>> GetCustomer(string id)
        {
            var customer = await _context.Customers.Include(q=>q.Accounts).ThenInclude(q=>q.Location).FirstOrDefaultAsync(q=>q.email==id);

            if (customer == null)
            {
                return NotFound();
            }

            var customerDetailsDto = _mapper.Map<GetCustomerDetails>(customer);

            return Ok(customerDetailsDto);
        }

        // GET: api/Customers/CustomerDetails/5
        [HttpGet("CustomerDetails/{id}")]
        public async Task<ActionResult<Customer>> GetCustomerDetails(string id)
        {
            var customer = await _context.Customers.FirstOrDefaultAsync(q => q.email == id);

            if (customer == null)
            {
                return NotFound();
            }

            var customerDetailsDto = _mapper.Map<GetCustomerDto>(customer);

            return Ok(customerDetailsDto);
        }

        // PUT: api/Customers/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCustomer(string id, UpdateCustomerDto updateCustomerDto)
        {
            if (id != updateCustomerDto.email)
            {
                return BadRequest();
            }

            //_context.Entry(customer).State = EntityState.Modified;
            var customer = await _context.Customers.FindAsync(id);
            if(customer==null)
            {
                return NotFound();
            }
            _mapper.Map(updateCustomerDto, customer);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CustomerExists(id))
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

        // POST: api/Customers
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Customer>> PostCustomer(CreateCustomerDto createcustomer)
        {
            var customer = _mapper.Map<Customer>(createcustomer);
            _context.Customers.Add(customer);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (CustomerExists(customer.email))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetCustomer", new { id = customer.email }, customer);
        }

        // DELETE: api/Customers/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCustomer(string id)
        {
            var customer = await _context.Customers.FindAsync(id);
            if (customer == null)
            {
                return NotFound();
            }

            _context.Customers.Remove(customer);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CustomerExists(string id)
        {
            return _context.Customers.Any(e => e.email == id);
        }
    }
}
