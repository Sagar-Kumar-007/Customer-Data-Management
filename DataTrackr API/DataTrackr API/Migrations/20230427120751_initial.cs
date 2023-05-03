using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DataTrackr_API.Migrations
{
    /// <inheritdoc />
    public partial class initial : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "coordinates",
                columns: table => new
                {
                    address = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    latitude = table.Column<double>(type: "float", nullable: false),
                    longitude = table.Column<double>(type: "float", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_coordinates", x => x.address);
                });

            migrationBuilder.CreateTable(
                name: "Customers",
                columns: table => new
                {
                    email = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    cname = table.Column<string>(type: "nvarchar(250)", nullable: true),
                    logo = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    sector = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    phoneNo = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    headquaters = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CountryCode = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Website = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Customers", x => x.email);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FirstName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    LastName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Username = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Password = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Token = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Role = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Accounts",
                columns: table => new
                {
                    Acc_email = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Acc_revenue = table.Column<double>(type: "float", nullable: false),
                    Locationaddress = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    aname = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    EstYear = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Customer_email = table.Column<string>(type: "nvarchar(450)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Accounts", x => x.Acc_email);
                    table.ForeignKey(
                        name: "FK_Accounts_Customers_Customer_email",
                        column: x => x.Customer_email,
                        principalTable: "Customers",
                        principalColumn: "email");
                    table.ForeignKey(
                        name: "FK_Accounts_coordinates_Locationaddress",
                        column: x => x.Locationaddress,
                        principalTable: "coordinates",
                        principalColumn: "address");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Accounts_Customer_email",
                table: "Accounts",
                column: "Customer_email");

            migrationBuilder.CreateIndex(
                name: "IX_Accounts_Locationaddress",
                table: "Accounts",
                column: "Locationaddress");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Accounts");

            migrationBuilder.DropTable(
                name: "Users");

            migrationBuilder.DropTable(
                name: "Customers");

            migrationBuilder.DropTable(
                name: "coordinates");
        }
    }
}
