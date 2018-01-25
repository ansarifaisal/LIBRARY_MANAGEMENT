namespace LibraryBackEnd.Persistence.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class addPublisherInMagazine : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Magazines", "Publisher", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.Magazines", "Publisher");
        }
    }
}
