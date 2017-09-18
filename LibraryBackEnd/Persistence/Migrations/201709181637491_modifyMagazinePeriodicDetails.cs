namespace LibraryBackEnd.Persistence.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class modifyMagazinePeriodicDetails : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.PeriodicMagazines", "SubscriptionDate", c => c.DateTime(nullable: false));
            AddColumn("dbo.PeriodicMagazines", "SubscriptionAmount", c => c.String());
            AddColumn("dbo.PeriodicMagazines", "SubscriptionDuration", c => c.String());
            AddColumn("dbo.PeriodicMagazines", "Type", c => c.String());
            AddColumn("dbo.PeriodicMagazines", "Course", c => c.String());
            AddColumn("dbo.PeriodicMagazines", "ChequeDate", c => c.String());
            AddColumn("dbo.PeriodicMagazines", "BundleSentDate", c => c.String());
            AddColumn("dbo.PeriodicMagazines", "BundleDeliveryDate", c => c.String());
            AlterColumn("dbo.PeriodicMagazines", "BillDate", c => c.String());
            DropColumn("dbo.Magazines", "Remark");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Magazines", "Remark", c => c.String());
            AlterColumn("dbo.PeriodicMagazines", "BillDate", c => c.DateTime(nullable: false));
            DropColumn("dbo.PeriodicMagazines", "BundleDeliveryDate");
            DropColumn("dbo.PeriodicMagazines", "BundleSentDate");
            DropColumn("dbo.PeriodicMagazines", "ChequeDate");
            DropColumn("dbo.PeriodicMagazines", "Course");
            DropColumn("dbo.PeriodicMagazines", "Type");
            DropColumn("dbo.PeriodicMagazines", "SubscriptionDuration");
            DropColumn("dbo.PeriodicMagazines", "SubscriptionAmount");
            DropColumn("dbo.PeriodicMagazines", "SubscriptionDate");
        }
    }
}
