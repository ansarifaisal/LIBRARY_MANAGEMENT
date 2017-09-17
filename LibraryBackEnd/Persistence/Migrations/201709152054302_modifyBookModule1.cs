namespace LibraryBackEnd.Persistence.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class modifyBookModule1 : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.IssueBooks", "IssuedBy", c => c.String());
            AddColumn("dbo.LostOrReplaces", "Librarian", c => c.String());
            AddColumn("dbo.ReturnBooks", "Librarian", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.ReturnBooks", "Librarian");
            DropColumn("dbo.LostOrReplaces", "Librarian");
            DropColumn("dbo.IssueBooks", "IssuedBy");
        }
    }
}
