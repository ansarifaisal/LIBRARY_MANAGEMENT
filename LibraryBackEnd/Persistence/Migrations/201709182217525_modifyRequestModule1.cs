namespace LibraryBackEnd.Persistence.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class modifyRequestModule1 : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Requests", "Type", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.Requests", "Type");
        }
    }
}
