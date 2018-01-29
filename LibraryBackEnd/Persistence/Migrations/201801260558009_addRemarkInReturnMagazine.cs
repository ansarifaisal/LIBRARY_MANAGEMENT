namespace LibraryBackEnd.Persistence.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class addRemarkInReturnMagazine : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.ReturnMagazines", "Remark", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.ReturnMagazines", "Remark");
        }
    }
}
