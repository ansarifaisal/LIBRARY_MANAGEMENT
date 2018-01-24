namespace LibraryBackEnd.Persistence.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class addPeriodicIdField : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Magazines", "PeriodicId", c => c.Int(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.Magazines", "PeriodicId");
        }
    }
}
