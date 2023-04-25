using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DataTrackr_API.Migrations
{
    /// <inheritdoc />
    public partial class Initial5 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Accounts_Coordinates_LocationLatitude_LocationLongitude",
                table: "Accounts");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Coordinates",
                table: "Coordinates");

            migrationBuilder.DropIndex(
                name: "IX_Accounts_LocationLatitude_LocationLongitude",
                table: "Accounts");

            migrationBuilder.AlterColumn<string>(
                name: "Address",
                table: "Coordinates",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "LocationAddress",
                table: "Accounts",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Coordinates",
                table: "Coordinates",
                columns: new[] { "Latitude", "Longitude", "Address" });

            migrationBuilder.CreateIndex(
                name: "IX_Accounts_LocationLatitude_LocationLongitude_LocationAddress",
                table: "Accounts",
                columns: new[] { "LocationLatitude", "LocationLongitude", "LocationAddress" });

            migrationBuilder.AddForeignKey(
                name: "FK_Accounts_Coordinates_LocationLatitude_LocationLongitude_LocationAddress",
                table: "Accounts",
                columns: new[] { "LocationLatitude", "LocationLongitude", "LocationAddress" },
                principalTable: "Coordinates",
                principalColumns: new[] { "Latitude", "Longitude", "Address" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Accounts_Coordinates_LocationLatitude_LocationLongitude_LocationAddress",
                table: "Accounts");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Coordinates",
                table: "Coordinates");

            migrationBuilder.DropIndex(
                name: "IX_Accounts_LocationLatitude_LocationLongitude_LocationAddress",
                table: "Accounts");

            migrationBuilder.DropColumn(
                name: "LocationAddress",
                table: "Accounts");

            migrationBuilder.AlterColumn<string>(
                name: "Address",
                table: "Coordinates",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Coordinates",
                table: "Coordinates",
                columns: new[] { "Latitude", "Longitude" });

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
    }
}
