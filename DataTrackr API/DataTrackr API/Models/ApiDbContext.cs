using DataTrackr_API.Models;
using Microsoft.EntityFrameworkCore;

namespace DataTrackr_Web_API.Models
{
    public class ApiDbContext:DbContext
    {
        public ApiDbContext(DbContextOptions options):base(options)
        {

        }
        public DbSet<Customer> Customers{ get; set; }
        public DbSet<Account> Accounts { get; set; }
        public DbSet<User> Users { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>().ToTable("users");

            modelBuilder.Entity<Coordinates>()
        .HasKey(c => new { c.Latitude, c.Longitude, c.Address });
        }
    }
}
