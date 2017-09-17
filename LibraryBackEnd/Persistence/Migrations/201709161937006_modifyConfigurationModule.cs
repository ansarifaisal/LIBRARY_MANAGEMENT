namespace LibraryBackEnd.Persistence.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class modifyConfigurationModule : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.SiteConfigurations", "Email", c => c.String());
            AddColumn("dbo.SiteConfigurations", "Password", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.SiteConfigurations", "Password");
            DropColumn("dbo.SiteConfigurations", "Email");
        }
    }
}
