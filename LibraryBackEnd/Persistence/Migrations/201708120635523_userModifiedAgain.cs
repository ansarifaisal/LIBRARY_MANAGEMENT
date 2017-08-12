namespace LibraryBackEnd.Persistence.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class userModifiedAgain : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.AspNetUsers", "FullName", c => c.String(nullable: false));
            AddColumn("dbo.AspNetUsers", "RollNo", c => c.String(nullable: false));
            AddColumn("dbo.AspNetUsers", "YearOfAdmission", c => c.Int(nullable: false));
            AddColumn("dbo.AspNetUsers", "Course", c => c.String(nullable: false));
            AddColumn("dbo.AspNetUsers", "IssueCount", c => c.Int(nullable: false));
            AddColumn("dbo.AspNetUsers", "Fine", c => c.Int(nullable: false));
            AddColumn("dbo.AspNetUsers", "Modified", c => c.Boolean(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.AspNetUsers", "Modified");
            DropColumn("dbo.AspNetUsers", "Fine");
            DropColumn("dbo.AspNetUsers", "IssueCount");
            DropColumn("dbo.AspNetUsers", "Course");
            DropColumn("dbo.AspNetUsers", "YearOfAdmission");
            DropColumn("dbo.AspNetUsers", "RollNo");
            DropColumn("dbo.AspNetUsers", "FullName");
        }
    }
}
