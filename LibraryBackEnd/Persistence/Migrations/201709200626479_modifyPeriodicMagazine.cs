namespace LibraryBackEnd.Persistence.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class modifyPeriodicMagazine : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.PeriodicMagazines", "Date", c => c.DateTime(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.PeriodicMagazines", "Date");
        }
    }
}
