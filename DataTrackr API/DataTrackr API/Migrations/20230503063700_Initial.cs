using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DataTrackr_API.Migrations
{
    /// <inheritdoc />
    public partial class Initial : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Coordinates",
                columns: table => new
                {
                    latitude = table.Column<double>(type: "float", nullable: false),
                    longitude = table.Column<double>(type: "float", nullable: false),
                    address = table.Column<string>(type: "nvarchar(450)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Coordinates", x => new { x.latitude, x.longitude, x.address });
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
                name: "Logs",
                columns: table => new
                {
                    logId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    userId = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    timeStamp = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    operation = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    message = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Logs", x => x.logId);
                });

            migrationBuilder.CreateTable(
                name: "Accounts",
                columns: table => new
                {
                    Acc_email = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Acc_revenue = table.Column<double>(type: "float", nullable: false),
                    Locationlatitude = table.Column<double>(type: "float", nullable: true),
                    Locationlongitude = table.Column<double>(type: "float", nullable: true),
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
                        name: "FK_Accounts_Coordinates_Locationlatitude_Locationlongitude_Locationaddress",
                        columns: x => new { x.Locationlatitude, x.Locationlongitude, x.Locationaddress },
                        principalTable: "Coordinates",
                        principalColumns: new[] { "latitude", "longitude", "address" });
                    table.ForeignKey(
                        name: "FK_Accounts_Customers_Customer_email",
                        column: x => x.Customer_email,
                        principalTable: "Customers",
                        principalColumn: "email");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Accounts_Customer_email",
                table: "Accounts",
                column: "Customer_email");

            migrationBuilder.CreateIndex(
                name: "IX_Accounts_Locationlatitude_Locationlongitude_Locationaddress",
                table: "Accounts",
                columns: new[] { "Locationlatitude", "Locationlongitude", "Locationaddress" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Accounts");

            migrationBuilder.DropTable(
                name: "Logs");

            migrationBuilder.DropTable(
                name: "Coordinates");

            migrationBuilder.DropTable(
                name: "Customers");
        }
    }
}
