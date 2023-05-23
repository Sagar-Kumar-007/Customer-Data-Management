using DataTrackr_API.Models;
using Microsoft.EntityFrameworkCore;

namespace DataTrackr_Web_API.Models
{
    public class ApiDbContext : DbContext
    {
        public ApiDbContext(DbContextOptions options) : base(options)
        {

        }
        public DbSet<Customer> Customers { get; set; }
        public DbSet<Account> Accounts { get; set; }
        public DbSet<Coordinates> Coordinates { get; set; }
        public DbSet<User> Users { get; set; }        
        public DbSet<Log> Logs { get; set; }
        

        public DbSet<Coordinates> coordinates{get;set;}
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Account>()
                .HasKey(a => a.AccountEmail);

            modelBuilder.Entity<Customer>()
                .HasKey(c => c.CustomerEmail);

            modelBuilder.Entity<Coordinates>()
                .HasKey(l => l.CoordinateId);

            modelBuilder.Entity<User>()
                .HasKey(u => u.UserId);

            modelBuilder.Entity<Log>()
                .HasKey(l => l.LogId);

            modelBuilder.Entity<Customer>()
                .HasMany(c => c.Accounts)
                .WithOne(a => a.Customer)
                .HasForeignKey(a => a.CustomerEmail);

            modelBuilder.Entity<Account>()
                .HasOne(a => a.Location)
                .WithMany(l => l.Accounts)
                .HasForeignKey(a=>a.CoordinateId);

            modelBuilder.Entity<Customer>()
                .HasOne(c => c.Headquarters)
                .WithMany(l => l.Customers)
                .HasForeignKey(c => c.CoordinateId);
        }


    }
}
