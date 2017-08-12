namespace LibraryBackEnd.Persistence.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class modifyIssuedBook : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.IssueBooks", "BookTitle", c => c.String(nullable: false));
            AlterColumn("dbo.IssueBooks", "Course", c => c.String(nullable: false));
            AlterColumn("dbo.IssueBooks", "FullName", c => c.String(nullable: false));
            AlterColumn("dbo.IssueBooks", "RollNo", c => c.String(nullable: false));
        }
        
        public override void Down()
        {
            AlterColumn("dbo.IssueBooks", "RollNo", c => c.String());
            AlterColumn("dbo.IssueBooks", "FullName", c => c.String());
            AlterColumn("dbo.IssueBooks", "Course", c => c.String());
            AlterColumn("dbo.IssueBooks", "BookTitle", c => c.String());
        }
    }
}
