namespace LibraryBackEnd.Persistence.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class modifyMagazine3 : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.IssueMagazines", "Volume", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.IssueMagazines", "Volume");
        }
    }
}
