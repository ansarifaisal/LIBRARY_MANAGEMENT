namespace LibraryBackEnd.Persistence.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class modifyIssueMagazine : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.IssueMagazines", "Course", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.IssueMagazines", "Course");
        }
    }
}
