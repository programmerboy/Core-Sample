using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Core_Sample.Migrations
{
    public partial class InitialDbModel : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Carriers",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Country = table.Column<string>(maxLength: 100, nullable: false),
                    CarrierName = table.Column<string>(maxLength: 200, nullable: false),
                    Two_G = table.Column<string>(maxLength: 200, nullable: true),
                    Three_G = table.Column<string>(maxLength: 200, nullable: true),
                    Four_G = table.Column<string>(maxLength: 600, nullable: true),
                    Five_G = table.Column<string>(maxLength: 600, nullable: true),
                    Date_Added = table.Column<DateTime>(nullable: false),
                    Date_Modified = table.Column<DateTime>(nullable: false, defaultValueSql: "GETDATE()")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Carriers", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Devices",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Brand = table.Column<string>(maxLength: 200, nullable: false),
                    PhoneModel = table.Column<string>(maxLength: 200, nullable: false),
                    SubModel = table.Column<string>(maxLength: 200, nullable: true),
                    Two_G = table.Column<string>(maxLength: 200, nullable: true),
                    Three_G = table.Column<string>(maxLength: 200, nullable: true),
                    Four_G = table.Column<string>(maxLength: 600, nullable: true),
                    Five_G = table.Column<string>(maxLength: 600, nullable: true),
                    Date_Added = table.Column<DateTime>(nullable: false),
                    Date_Modified = table.Column<DateTime>(nullable: false, defaultValueSql: "GETDATE()")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Devices", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Carriers");

            migrationBuilder.DropTable(
                name: "Devices");
        }
    }
}
