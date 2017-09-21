namespace LibraryBackEnd.Persistence.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class addISBNAndISSN : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Books", "Isbn", c => c.String(nullable: false));
            AddColumn("dbo.Magazines", "Issn", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.Magazines", "Issn");
            DropColumn("dbo.Books", "Isbn");
        }
    }
}
