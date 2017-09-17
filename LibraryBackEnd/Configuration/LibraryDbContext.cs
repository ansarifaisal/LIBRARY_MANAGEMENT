using LibraryBackEnd.Core.Models;
using Microsoft.AspNet.Identity.EntityFramework;
using System.Data.Entity;

namespace LibraryBackEnd.Configuration
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {

        public DbSet<Publication> Publications { get; set; }
        public DbSet<Author> Authors { get; set; }
        public DbSet<Course> Courses { get; set; }
        public DbSet<Subject> Subjects { get; set; }
        public DbSet<Book> Books { get; set; }
        public DbSet<IssueBook> IssueBooks { get; set; }
        public DbSet<ReturnBook> ReturnBooks { get; set; }
        public DbSet<LostOrReplace> LostOrReplaces { get; set; }
        public DbSet<Request> Requests { get; set; }

        public DbSet<MagazinePublisher> MagazinePublishers { get; set; }
        public DbSet<PeriodicMagazine> PeriodicMagazines { get; set; }
        public DbSet<Magazine> Magazines { get; set; }
        public DbSet<IssueMagazine> IssueMagazines { get; set; }
        public DbSet<ReturnMagazine> ReturnMagazines { get; set; }
        public DbSet<LostOrReplaceMagazine> lostOrReplaceMagazines { get; set; }

        public DbSet<NewspaperPublisher> NewsPaperPublishers { get; set; }
        public DbSet<PeriodicNewspaper> PeriodicNewspapers { get; set; }
        public DbSet<NewspaperMonth> NewspaperMonths { get; set; }
        public DbSet<Newspaper> Newspapers { get; set; }

        public DbSet<SiteConfiguration> SiteConfigurations { get; set; }

        //intializing the dbcontext with DefaultConnection 
        public ApplicationDbContext()
                : base("DefaultConnection", throwIfV1Schema: false)
        {
        }

        public static ApplicationDbContext Create()
        {
            return new ApplicationDbContext();
        }
    }
}

