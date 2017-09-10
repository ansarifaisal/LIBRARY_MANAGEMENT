namespace LibraryBackEnd.Persistence.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class modifyIssueMagazine1 : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.IssueMagazines", "IssuedBy", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.IssueMagazines", "IssuedBy");
        }
    }
}
