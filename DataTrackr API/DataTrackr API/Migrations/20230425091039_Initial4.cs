using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DataTrackr_API.Migrations
{
    /// <inheritdoc />
    public partial class Initial4 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Location",
                table: "Accounts");

            migrationBuilder.AddColumn<double>(
                name: "LocationLatitude",
                table: "Accounts",
                type: "float",
                nullable: true);

            migrationBuilder.AddColumn<double>(
                name: "LocationLongitude",
                table: "Accounts",
                type: "float",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Coordinates",
                columns: table => new
                {
                    Latitude = table.Column<double>(type: "float", nullable: false),
                    Longitude = table.Column<double>(type: "float", nullable: false),
                    Address = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Coordinates", x => new { x.Latitude, x.Longitude });
                });

            migrationBuilder.CreateIndex(
                name: "IX_Accounts_LocationLatitude_LocationLongitude",
                table: "Accounts",
                columns: new[] { "LocationLatitude", "LocationLongitude" });

            migrationBuilder.AddForeignKey(
                name: "FK_Accounts_Coordinates_LocationLatitude_LocationLongitude",
                table: "Accounts",
                columns: new[] { "LocationLatitude", "LocationLongitude" },
                principalTable: "Coordinates",
                principalColumns: new[] { "Latitude", "Longitude" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Accounts_Coordinates_LocationLatitude_LocationLongitude",
                table: "Accounts");

            migrationBuilder.DropTable(
                name: "Coordinates");

            migrationBuilder.DropIndex(
                name: "IX_Accounts_LocationLatitude_LocationLongitude",
                table: "Accounts");

            migrationBuilder.DropColumn(
                name: "LocationLatitude",
                table: "Accounts");

            migrationBuilder.DropColumn(
                name: "LocationLongitude",
                table: "Accounts");

            migrationBuilder.AddColumn<string>(
                name: "Location",
                table: "Accounts",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
