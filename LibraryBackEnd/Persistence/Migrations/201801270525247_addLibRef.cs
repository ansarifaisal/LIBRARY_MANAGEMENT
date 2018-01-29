namespace LibraryBackEnd.Persistence.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class addLibRef : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Magazines", "LibRef", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.Magazines", "LibRef");
        }
    }
}
