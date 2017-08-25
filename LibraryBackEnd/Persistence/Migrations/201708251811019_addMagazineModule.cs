namespace LibraryBackEnd.Persistence.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class addMagazineModule : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.IssueMagazines",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        title = c.String(),
                        Number = c.String(),
                        IssuedDate = c.DateTime(nullable: false),
                        ReturnDate = c.DateTime(nullable: false),
                        FullName = c.String(),
                        RollNo = c.String(),
                        Email = c.String(),
                        Fine = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.MagazinePublishers",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Title = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.Magazines",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Title = c.String(),
                        Date = c.DateTime(nullable: false),
                        Month = c.DateTime(nullable: false),
                        Volume = c.Int(nullable: false),
                        Number = c.Int(nullable: false),
                        DateOfRecieved = c.String(),
                        RecievedBy = c.String(),
                        Remark = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.PeriodicMagazines",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Title = c.String(),
                        Periodicity = c.String(),
                        Publisher = c.String(),
                        Subscription = c.String(),
                        From = c.DateTime(nullable: false),
                        To = c.DateTime(nullable: false),
                        Volume = c.Int(nullable: false),
                        Source = c.String(),
                        OrderNo = c.String(),
                        OrderDate = c.DateTime(nullable: false),
                        BillNo = c.String(),
                        BillDate = c.DateTime(nullable: false),
                        Amount = c.Double(nullable: false),
                        PaidBy = c.String(),
                        ChequeNo = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.ReturnMagazines",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        title = c.String(),
                        Number = c.String(),
                        IssuedDate = c.DateTime(nullable: false),
                        ReturnDate = c.DateTime(nullable: false),
                        ActualReturnDate = c.DateTime(nullable: false),
                        FullName = c.String(),
                        RollNo = c.String(),
                        Email = c.String(),
                        Fine = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.ReturnMagazines");
            DropTable("dbo.PeriodicMagazines");
            DropTable("dbo.Magazines");
            DropTable("dbo.MagazinePublishers");
            DropTable("dbo.IssueMagazines");
        }
    }
}
