namespace LibraryBackEnd.Persistence.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class modifyReturnMagazine : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.ReturnMagazines", "RecievedBy", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.ReturnMagazines", "RecievedBy");
        }
    }
}
