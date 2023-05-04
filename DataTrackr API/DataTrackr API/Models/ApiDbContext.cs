using Microsoft.EntityFrameworkCore;
using DataTrackr_API.Models;

namespace DataTrackr_Web_API.Models
{
    public class ApiDbContext:DbContext
    {
        public ApiDbContext(DbContextOptions options):base(options)
        {

        }
        public DbSet<Customer> Customers{ get; set; }
        public DbSet<Account> Accounts { get; set; }
        public DbSet<Logs> Logs { get; set; }
        

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Coordinates>().HasKey(c => new { c.latitude, c.longitude, c.address });
        }

      
    }
}
