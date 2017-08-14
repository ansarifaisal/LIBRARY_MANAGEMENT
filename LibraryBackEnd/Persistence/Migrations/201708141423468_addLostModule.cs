namespace LibraryBackEnd.Persistence.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class addLostModule : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.LostOrReplaces",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        BookTitle = c.String(nullable: false),
                        AccessionNumber = c.String(nullable: false),
                        IssuedDate = c.DateTime(nullable: false),
                        ReturnDate = c.DateTime(nullable: false),
                        Course = c.String(nullable: false),
                        FullName = c.String(nullable: false),
                        RollNo = c.String(nullable: false),
                        Email = c.String(nullable: false),
                        Status = c.String(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.LostOrReplaces");
        }
    }
}
