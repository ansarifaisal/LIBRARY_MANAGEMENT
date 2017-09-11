namespace LibraryBackEnd.Persistence.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class modifyNewspaperMonth : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.NewspaperMonths", "From", c => c.String());
            AlterColumn("dbo.NewspaperMonths", "To", c => c.String());
        }
        
        public override void Down()
        {
            AlterColumn("dbo.NewspaperMonths", "To", c => c.DateTime(nullable: false));
            AlterColumn("dbo.NewspaperMonths", "From", c => c.DateTime(nullable: false));
        }
    }
}
