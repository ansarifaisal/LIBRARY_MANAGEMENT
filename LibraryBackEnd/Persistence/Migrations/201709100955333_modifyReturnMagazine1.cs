namespace LibraryBackEnd.Persistence.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class modifyReturnMagazine1 : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.ReturnMagazines", "Volume", c => c.String());
            AddColumn("dbo.ReturnMagazines", "Course", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.ReturnMagazines", "Course");
            DropColumn("dbo.ReturnMagazines", "Volume");
        }
    }
}
