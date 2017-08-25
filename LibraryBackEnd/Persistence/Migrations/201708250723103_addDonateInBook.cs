namespace LibraryBackEnd.Persistence.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class addDonateInBook : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Books", "Get", c => c.String());
            AlterColumn("dbo.Books", "BillNo", c => c.String());
        }
        
        public override void Down()
        {
            AlterColumn("dbo.Books", "BillNo", c => c.String(nullable: false));
            DropColumn("dbo.Books", "Get");
        }
    }
}
