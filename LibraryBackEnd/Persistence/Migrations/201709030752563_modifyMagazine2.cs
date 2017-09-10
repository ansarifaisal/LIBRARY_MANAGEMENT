namespace LibraryBackEnd.Persistence.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class modifyMagazine2 : DbMigration
    {
        public override void Up()
        {
            DropColumn("dbo.Magazines", "Title");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Magazines", "Title", c => c.String());
        }
    }
}
