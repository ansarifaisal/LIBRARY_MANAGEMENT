namespace LibraryBackEnd.Persistence.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class modifyIssuedBook1 : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.IssueBooks", "AccessionNumber", c => c.String(nullable: false));
            AddColumn("dbo.IssueBooks", "Fine", c => c.Int(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.IssueBooks", "Fine");
            DropColumn("dbo.IssueBooks", "AccessionNumber");
        }
    }
}
