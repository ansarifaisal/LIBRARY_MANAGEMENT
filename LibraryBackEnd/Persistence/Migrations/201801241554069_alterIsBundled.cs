namespace LibraryBackEnd.Persistence.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class alterIsBundled : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.PeriodicMagazines", "Bundled", c => c.String());
            DropColumn("dbo.PeriodicMagazines", "isBundled");
        }
        
        public override void Down()
        {
            AddColumn("dbo.PeriodicMagazines", "isBundled", c => c.Boolean(nullable: false));
            DropColumn("dbo.PeriodicMagazines", "Bundled");
        }
    }
}
