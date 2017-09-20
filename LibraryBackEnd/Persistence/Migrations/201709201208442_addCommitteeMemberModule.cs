namespace LibraryBackEnd.Persistence.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class addCommitteeMemberModule : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.CommitteeMembers",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Date = c.DateTime(nullable: false),
                        Name = c.String(),
                        Designation = c.String(),
                        CommitteeRole = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.CommitteeMembers");
        }
    }
}
