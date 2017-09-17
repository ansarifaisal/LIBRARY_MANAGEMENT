namespace LibraryBackEnd.Persistence.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class modifyConfiguration : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.SiteConfigurations", "NotificationSent", c => c.String());
            AlterColumn("dbo.SiteConfigurations", "CanLogin", c => c.String());
            AlterColumn("dbo.SiteConfigurations", "CanRegister", c => c.String());
        }
        
        public override void Down()
        {
            AlterColumn("dbo.SiteConfigurations", "CanRegister", c => c.Boolean(nullable: false));
            AlterColumn("dbo.SiteConfigurations", "CanLogin", c => c.Boolean(nullable: false));
            DropColumn("dbo.SiteConfigurations", "NotificationSent");
        }
    }
}
