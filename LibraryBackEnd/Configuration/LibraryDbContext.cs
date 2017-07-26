using LibraryBackEnd.Core.Models;
using Microsoft.AspNet.Identity.EntityFramework;

namespace LibraryBackEnd.Configuration
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {

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

