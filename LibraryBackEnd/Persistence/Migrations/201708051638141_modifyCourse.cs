namespace LibraryBackEnd.Persistence.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class modifyCourse : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Courses", "NoOfSemesters", c => c.Int(nullable: false));
            AddColumn("dbo.Courses", "NoOfStudents", c => c.Int(nullable: false));
            DropColumn("dbo.Courses", "NoOfSemester");
            DropColumn("dbo.Courses", "NoOfStudent");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Courses", "NoOfStudent", c => c.Int(nullable: false));
            AddColumn("dbo.Courses", "NoOfSemester", c => c.Int(nullable: false));
            DropColumn("dbo.Courses", "NoOfStudents");
            DropColumn("dbo.Courses", "NoOfSemesters");
        }
    }
}
