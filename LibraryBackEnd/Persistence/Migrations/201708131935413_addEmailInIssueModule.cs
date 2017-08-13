namespace LibraryBackEnd.Persistence.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class addEmailInIssueModule : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.IssueBooks", "Email", c => c.String(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.IssueBooks", "Email");
        }
    }
}
