namespace LibraryBackEnd.Persistence.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddAuthor2 : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.Authors", "PublicationId", "dbo.Publications");
            DropForeignKey("dbo.Publications", "Author_Id", "dbo.Authors");
            DropIndex("dbo.Authors", new[] { "PublicationId" });
            DropIndex("dbo.Publications", new[] { "Author_Id" });
            DropColumn("dbo.Authors", "PublicationName");
            DropColumn("dbo.Authors", "PublicationId");
            DropColumn("dbo.Publications", "Author_Id");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Publications", "Author_Id", c => c.Int());
            AddColumn("dbo.Authors", "PublicationId", c => c.Int(nullable: false));
            AddColumn("dbo.Authors", "PublicationName", c => c.String(nullable: false));
            CreateIndex("dbo.Publications", "Author_Id");
            CreateIndex("dbo.Authors", "PublicationId");
            AddForeignKey("dbo.Publications", "Author_Id", "dbo.Authors", "Id");
            AddForeignKey("dbo.Authors", "PublicationId", "dbo.Publications", "Id", cascadeDelete: true);
        }
    }
}
