namespace LibraryBackEnd.Persistence.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class modifyLostOrReplaceAndReturnBook : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.LostOrReplaces", "Remark", c => c.String());
            AddColumn("dbo.ReturnBooks", "Remark", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.ReturnBooks", "Remark");
            DropColumn("dbo.LostOrReplaces", "Remark");
        }
    }
}
