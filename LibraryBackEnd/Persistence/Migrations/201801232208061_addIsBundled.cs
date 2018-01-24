namespace LibraryBackEnd.Persistence.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class addIsBundled : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.PeriodicMagazines", "isBundled", c => c.Boolean(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.PeriodicMagazines", "isBundled");
        }
    }
}
