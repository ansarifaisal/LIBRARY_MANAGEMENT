namespace LibraryBackEnd.Persistence.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class modifyBookModule : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Books", "Publisher", c => c.String(nullable: false));
            AddColumn("dbo.Books", "Source", c => c.String(nullable: false));
            AddColumn("dbo.Books", "Edition", c => c.String(nullable: false));
            AlterColumn("dbo.Books", "AccessionNumber", c => c.String(nullable: false));
            AlterColumn("dbo.Books", "Pages", c => c.String(nullable: false));
            AlterColumn("dbo.Books", "Author", c => c.String(nullable: false));
            AlterColumn("dbo.Books", "PlaceOfPublication", c => c.String(nullable: false));
            AlterColumn("dbo.Books", "Course", c => c.String(nullable: false));
            AlterColumn("dbo.Books", "Subject", c => c.String(nullable: false));
            AlterColumn("dbo.Books", "TypeOfBook", c => c.String(nullable: false));
            AlterColumn("dbo.Books", "ClassNo", c => c.String(nullable: false));
            AlterColumn("dbo.Books", "BillNo", c => c.String(nullable: false));
            AlterColumn("dbo.Books", "Status", c => c.String(nullable: false));
            DropColumn("dbo.Books", "Publication");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Books", "Publication", c => c.String());
            AlterColumn("dbo.Books", "Status", c => c.String());
            AlterColumn("dbo.Books", "BillNo", c => c.String());
            AlterColumn("dbo.Books", "ClassNo", c => c.String());
            AlterColumn("dbo.Books", "TypeOfBook", c => c.String());
            AlterColumn("dbo.Books", "Subject", c => c.String());
            AlterColumn("dbo.Books", "Course", c => c.String());
            AlterColumn("dbo.Books", "PlaceOfPublication", c => c.String());
            AlterColumn("dbo.Books", "Author", c => c.String());
            AlterColumn("dbo.Books", "Pages", c => c.String());
            AlterColumn("dbo.Books", "AccessionNumber", c => c.String());
            DropColumn("dbo.Books", "Edition");
            DropColumn("dbo.Books", "Source");
            DropColumn("dbo.Books", "Publisher");
        }
    }
}
