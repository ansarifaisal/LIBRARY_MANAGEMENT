namespace LibraryBackEnd.Persistence.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class addLostOrReplaceMagazine : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.LostOrReplaceMagazines",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Title = c.String(),
                        Number = c.String(),
                        Volume = c.Int(nullable: false),
                        IssuedDate = c.DateTime(nullable: false),
                        ReturnDate = c.DateTime(nullable: false),
                        ReceivedBy = c.String(),
                        RollNo = c.String(),
                        FullName = c.String(),
                        Course = c.String(),
                        Email = c.String(),
                        Status = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.LostOrReplaceMagazines");
        }
    }
}
