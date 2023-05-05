using DataTrackr_API.Models;
using Microsoft.EntityFrameworkCore;
using DataTrackr_API.Models;

namespace DataTrackr_Web_API.Models
{
    public class ApiDbContext : DbContext
    {
        public ApiDbContext(DbContextOptions options) : base(options)
        {

        }
        public DbSet<Customer> Customers { get; set; }
        public DbSet<Account> Accounts { get; set; }
        public DbSet<User> Users { get; set; }        
        public DbSet<Logs> Logs { get; set; }
        

        public DbSet<Coordinates> coordinates{get;set;}
        //protected override void OnModelCreating(ModelBuilder modelBuilder)
        //{
        //    modelBuilder.Entity<Coordinates>()
        //        .HasKey(c => new { c.Latitude, c.Longitude, c.Address });
        //}

      
    }
}
