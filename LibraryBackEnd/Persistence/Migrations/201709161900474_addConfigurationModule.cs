namespace LibraryBackEnd.Persistence.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class addConfigurationModule : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.SiteConfigurations",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Fine = c.Int(nullable: false),
                        IssueDays = c.Int(nullable: false),
                        NoOfBookIssue = c.Int(nullable: false),
                        AdminName = c.String(),
                        CanLogin = c.Boolean(nullable: false),
                        CanRegister = c.Boolean(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.SiteConfigurations");
        }
    }
}
