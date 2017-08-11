namespace LibraryBackEnd.Persistence.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class ModifyUser : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.AspNetUsers", "FullName", c => c.String(nullable: false));
            AddColumn("dbo.AspNetUsers", "RollNo", c => c.String(nullable: false));
            AddColumn("dbo.AspNetUsers", "YearOfAdmission", c => c.Int(nullable: false));
            AddColumn("dbo.AspNetUsers", "Course", c => c.String(nullable: false));
            AddColumn("dbo.AspNetUsers", "IssueCount", c => c.Int(nullable: false));
            AddColumn("dbo.AspNetUsers", "Fine", c => c.Int(nullable: false));
            AlterColumn("dbo.AspNetUsers", "Role", c => c.String(nullable: false));
            AlterColumn("dbo.AspNetUsers", "Status", c => c.String(nullable: false));
        }
        
        public override void Down()
        {
            AlterColumn("dbo.AspNetUsers", "Status", c => c.String());
            AlterColumn("dbo.AspNetUsers", "Role", c => c.String());
            DropColumn("dbo.AspNetUsers", "Fine");
            DropColumn("dbo.AspNetUsers", "IssueCount");
            DropColumn("dbo.AspNetUsers", "Course");
            DropColumn("dbo.AspNetUsers", "YearOfAdmission");
            DropColumn("dbo.AspNetUsers", "RollNo");
            DropColumn("dbo.AspNetUsers", "FullName");
        }
    }
}
