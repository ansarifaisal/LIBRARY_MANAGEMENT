namespace LibraryBackEnd.Persistence.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class modifyMagazineNumber : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.Magazines", "Number", c => c.String());
        }
        
        public override void Down()
        {
            AlterColumn("dbo.Magazines", "Number", c => c.Int(nullable: false));
        }
    }
}
