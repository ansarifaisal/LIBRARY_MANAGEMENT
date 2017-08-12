namespace LibraryBackEnd.Persistence.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class userModifiedAgain1 : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.AspNetUsers", "FullName", c => c.String());
            AlterColumn("dbo.AspNetUsers", "RollNo", c => c.String());
            AlterColumn("dbo.AspNetUsers", "Course", c => c.String());
        }
        
        public override void Down()
        {
            AlterColumn("dbo.AspNetUsers", "Course", c => c.String(nullable: false));
            AlterColumn("dbo.AspNetUsers", "RollNo", c => c.String(nullable: false));
            AlterColumn("dbo.AspNetUsers", "FullName", c => c.String(nullable: false));
        }
    }
}
