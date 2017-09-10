namespace LibraryBackEnd.Persistence.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class modifyMagazine1 : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.Magazines", "DateOfRecieved", c => c.DateTime(nullable: false));
        }
        
        public override void Down()
        {
            AlterColumn("dbo.Magazines", "DateOfRecieved", c => c.String());
        }
    }
}
