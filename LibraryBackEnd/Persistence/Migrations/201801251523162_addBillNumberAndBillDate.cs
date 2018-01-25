namespace LibraryBackEnd.Persistence.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class addBillNumberAndBillDate : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.BindingMagazines", "BillNumber", c => c.Int(nullable: false));
            AddColumn("dbo.BindingMagazines", "BillDate", c => c.DateTime(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.BindingMagazines", "BillDate");
            DropColumn("dbo.BindingMagazines", "BillNumber");
        }
    }
}
