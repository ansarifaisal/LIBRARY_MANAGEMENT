namespace LibraryBackEnd.Persistence.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class addLostOrReplaceMagazine1 : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.LostOrReplaceMagazines", "Remark", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.LostOrReplaceMagazines", "Remark");
        }
    }
}
