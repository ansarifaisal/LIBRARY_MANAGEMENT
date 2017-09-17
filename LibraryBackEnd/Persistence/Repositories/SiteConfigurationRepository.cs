using LibraryBackEnd.Configuration;
using LibraryBackEnd.Core.IRepositories;
using LibraryBackEnd.Core.Models;

namespace LibraryBackEnd.Persistence.Repositories
{
    public class SiteConfigurationRepository : GenericRepository<SiteConfiguration>, ISiteConfigurationRepository
    {

        private ApplicationDbContext _context;

        public SiteConfigurationRepository(ApplicationDbContext context)
            : base(context)
        {
            _context = context;
        }
    }
}
