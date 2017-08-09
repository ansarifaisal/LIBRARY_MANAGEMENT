namespace LibraryBackEnd.Persistence.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class addBookModule : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Books",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        AccessionNumber = c.String(),
                        Date = c.DateTime(nullable: false),
                        Title = c.Int(nullable: false),
                        Pages = c.String(),
                        Author = c.String(),
                        Publication = c.String(),
                        PlaceOfPublication = c.String(),
                        DateOfPublication = c.DateTime(nullable: false),
                        Course = c.String(),
                        Semester = c.Int(nullable: false),
                        Subject = c.String(),
                        TypeOfBook = c.String(),
                        ClassNo = c.String(),
                        ActualPrice = c.Double(nullable: false),
                        Discount = c.Double(nullable: false),
                        DiscountPrice = c.Double(nullable: false),
                        BillNo = c.String(),
                        BillDate = c.DateTime(nullable: false),
                        Status = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.Books");
        }
    }
}
