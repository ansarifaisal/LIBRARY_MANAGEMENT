namespace LibraryBackEnd.Persistence.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class modifyPeriodicMagazineOrderDate : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.PeriodicMagazines", "OrderDate", c => c.String());
        }
        
        public override void Down()
        {
            AlterColumn("dbo.PeriodicMagazines", "OrderDate", c => c.DateTime(nullable: false));
        }
    }
}
