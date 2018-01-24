namespace LibraryBackEnd.Persistence.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class addBundleMagazine : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.BindingMagazines",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        AccessionNumber = c.String(nullable: false),
                        Date = c.DateTime(nullable: false),
                        Title = c.String(nullable: false),
                        Pages = c.String(nullable: false),
                        Editor = c.String(nullable: false),
                        Publisher = c.String(nullable: false),
                        Issn = c.String(nullable: false),
                        Source = c.String(nullable: false),
                        ClassNo = c.String(nullable: false),
                        Course = c.String(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.BindingMagazines");
        }
    }
}
