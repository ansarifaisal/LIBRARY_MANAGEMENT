namespace LibraryBackEnd.Persistence.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class modifyMagazine4 : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Magazines", "Status", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.Magazines", "Status");
        }
    }
}
