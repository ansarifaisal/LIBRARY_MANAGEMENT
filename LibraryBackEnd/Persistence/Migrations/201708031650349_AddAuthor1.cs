namespace LibraryBackEnd.Persistence.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddAuthor1 : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Authors", "PublicationName", c => c.String(nullable: false));
            AddColumn("dbo.Authors", "PublicationId", c => c.Int(nullable: false));
            AddColumn("dbo.Publications", "Author_Id", c => c.Int());
            CreateIndex("dbo.Authors", "PublicationId");
            CreateIndex("dbo.Publications", "Author_Id");
            AddForeignKey("dbo.Authors", "PublicationId", "dbo.Publications", "Id", cascadeDelete: true);
            AddForeignKey("dbo.Publications", "Author_Id", "dbo.Authors", "Id");
            DropColumn("dbo.Authors", "Publication");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Authors", "Publication", c => c.String(nullable: false));
            DropForeignKey("dbo.Publications", "Author_Id", "dbo.Authors");
            DropForeignKey("dbo.Authors", "PublicationId", "dbo.Publications");
            DropIndex("dbo.Publications", new[] { "Author_Id" });
            DropIndex("dbo.Authors", new[] { "PublicationId" });
            DropColumn("dbo.Publications", "Author_Id");
            DropColumn("dbo.Authors", "PublicationId");
            DropColumn("dbo.Authors", "PublicationName");
        }
    }
}
