namespace LibraryBackEnd.Persistence.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class modifyNewsPaperModule1 : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.NewspaperMonths",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Month = c.DateTime(nullable: false),
                        BillNumber = c.Int(nullable: false),
                        Amount = c.Double(nullable: false),
                        Publisher = c.String(),
                        Title = c.String(),
                        Librarian = c.String(),
                        From = c.DateTime(nullable: false),
                        To = c.DateTime(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.NewspaperMonths");
        }
    }
}
