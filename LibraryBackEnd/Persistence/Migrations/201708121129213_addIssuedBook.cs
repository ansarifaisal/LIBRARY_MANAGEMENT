namespace LibraryBackEnd.Persistence.Migrations
{
    using System.Data.Entity.Migrations;

    public partial class addIssuedBook : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.IssueBooks",
                c => new
                {
                    Id = c.Int(nullable: false, identity: true),
                    BookTitle = c.String(),
                    IssuedDate = c.DateTime(nullable: false),
                    ReturnDate = c.DateTime(nullable: false),
                    Course = c.String(),
                    FullName = c.String(),
                    RollNo = c.String(),
                })
                .PrimaryKey(t => t.Id);

        }

        public override void Down()
        {
            DropTable("dbo.IssueBooks");
        }
    }
}
