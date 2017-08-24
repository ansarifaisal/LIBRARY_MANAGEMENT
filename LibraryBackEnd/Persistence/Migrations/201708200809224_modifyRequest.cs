namespace LibraryBackEnd.Persistence.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class modifyRequest : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Requests", "Subject", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.Requests", "Subject");
        }
    }
}
