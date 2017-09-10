namespace LibraryBackEnd.Persistence.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class modifyMagazine : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Magazines", "PeriodicTitle", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.Magazines", "PeriodicTitle");
        }
    }
}
