﻿// <auto-generated />
using DataTrackr_Web_API.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace DataTrackr_API.Migrations
{
    [DbContext(typeof(ApiDbContext))]
    partial class ApiDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.5")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("DataTrackr_Web_API.Models.Account", b =>
                {
                    b.Property<string>("Location")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("EstYear")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("PmId")
                        .HasColumnType("int");

                    b.Property<string>("email")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("name")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Location");

                    b.HasIndex("email");

                    b.ToTable("Accounts");
                });

            modelBuilder.Entity("DataTrackr_Web_API.Models.Customer", b =>
                {
                    b.Property<string>("email")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("CountryCode")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Description")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Website")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("cname")
                        .HasColumnType("nvarchar(250)");

                    b.Property<string>("headquaters")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("logo")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("phoneNo")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("sector")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("email");

                    b.ToTable("Customers");
                });

            modelBuilder.Entity("DataTrackr_Web_API.Models.Account", b =>
                {
                    b.HasOne("DataTrackr_Web_API.Models.Customer", "Customer")
                        .WithMany("Accounts")
                        .HasForeignKey("email");

                    b.Navigation("Customer");
                });

            modelBuilder.Entity("DataTrackr_Web_API.Models.Customer", b =>
                {
                    b.Navigation("Accounts");
                });
#pragma warning restore 612, 618
        }
    }
}
