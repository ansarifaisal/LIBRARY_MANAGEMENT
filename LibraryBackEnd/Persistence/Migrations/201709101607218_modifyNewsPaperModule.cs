namespace LibraryBackEnd.Persistence.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class modifyNewsPaperModule : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Newspapers", "Month", c => c.DateTime(nullable: false));
            AddColumn("dbo.Newspapers", "Librarian", c => c.String());
            AddColumn("dbo.Newspapers", "Remark", c => c.String());
            DropColumn("dbo.PeriodicNewspapers", "BillNumber");
            DropColumn("dbo.PeriodicNewspapers", "From");
            DropColumn("dbo.PeriodicNewspapers", "To");
        }
        
        public override void Down()
        {
            AddColumn("dbo.PeriodicNewspapers", "To", c => c.DateTime(nullable: false));
            AddColumn("dbo.PeriodicNewspapers", "From", c => c.DateTime(nullable: false));
            AddColumn("dbo.PeriodicNewspapers", "BillNumber", c => c.Int(nullable: false));
            DropColumn("dbo.Newspapers", "Remark");
            DropColumn("dbo.Newspapers", "Librarian");
            DropColumn("dbo.Newspapers", "Month");
        }
    }
}
