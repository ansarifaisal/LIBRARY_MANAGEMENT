namespace LibraryBackEnd.Persistence.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class addEmailRequestModule : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Requests", "Email", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.Requests", "Email");
        }
    }
}
