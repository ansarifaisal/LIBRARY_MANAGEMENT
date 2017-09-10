namespace LibraryBackEnd.Persistence.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class addNewsPaperModule : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.NewspaperPublishers",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Title = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.Newspapers",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Title = c.String(),
                        Publisher = c.String(),
                        Date = c.DateTime(nullable: false),
                        Price = c.Double(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.PeriodicNewspapers",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Title = c.String(),
                        Publisher = c.String(),
                        BillNumber = c.Int(nullable: false),
                        From = c.DateTime(nullable: false),
                        To = c.DateTime(nullable: false),
                        Amount = c.Double(nullable: false),
                        Librarian = c.String(),
                        Remark = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.PeriodicNewspapers");
            DropTable("dbo.Newspapers");
            DropTable("dbo.NewspaperPublishers");
        }
    }
}
