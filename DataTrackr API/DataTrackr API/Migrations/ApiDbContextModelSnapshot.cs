﻿// <auto-generated />
using System;
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

            modelBuilder.Entity("DataTrackr_API.Models.Logs", b =>
                {
                    b.Property<int>("logId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("logId"));

                    b.Property<string>("message")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("operation")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("timeStamp")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("userId")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("logId");

                    b.ToTable("Logs");
                });

            modelBuilder.Entity("DataTrackr_API.Models.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Email")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("FirstName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("LastName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Password")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("ResetPasswordExpiry")
                        .HasColumnType("datetime2");

                    b.Property<string>("ResetPasswordToken")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Role")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Token")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Username")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("DataTrackr_Web_API.Models.Account", b =>
                {
                    b.Property<string>("Acc_email")
                        .HasColumnType("nvarchar(450)");

                    b.Property<decimal>("Acc_revenue")
                        .HasColumnType("decimal(18,2)");

                    b.Property<string>("Customer_email")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("EstYear")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Locationaddress")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("aname")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("description")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Acc_email");

                    b.HasIndex("Customer_email");

                    b.HasIndex("Locationaddress");

                    b.ToTable("Accounts");
                });

            modelBuilder.Entity("DataTrackr_Web_API.Models.Coordinates", b =>
                {
                    b.Property<string>("address")
                        .HasColumnType("nvarchar(450)");

                    b.Property<double>("latitude")
                        .HasColumnType("float");

                    b.Property<double>("longitude")
                        .HasColumnType("float");

                    b.HasKey("address");

                    b.ToTable("coordinates");
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
                        .HasForeignKey("Customer_email");

                    b.HasOne("DataTrackr_Web_API.Models.Coordinates", "Location")
                        .WithMany()
                        .HasForeignKey("Locationaddress");

                    b.Navigation("Customer");

                    b.Navigation("Location");
                });

            modelBuilder.Entity("DataTrackr_Web_API.Models.Customer", b =>
                {
                    b.Navigation("Accounts");
                });
#pragma warning restore 612, 618
        }
    }
}
