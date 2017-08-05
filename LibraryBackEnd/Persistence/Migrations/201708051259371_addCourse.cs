namespace LibraryBackEnd.Persistence.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class addCourse : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Courses",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(nullable: false),
                        NoOfBooks = c.Int(nullable: false),
                        NoOfSemester = c.Int(nullable: false),
                        NoOfStudent = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
            AddColumn("dbo.Authors", "NoOfBooks", c => c.Int(nullable: false));
            AddColumn("dbo.Publications", "NoOfBooks", c => c.Int(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.Publications", "NoOfBooks");
            DropColumn("dbo.Authors", "NoOfBooks");
            DropTable("dbo.Courses");
        }
    }
}
