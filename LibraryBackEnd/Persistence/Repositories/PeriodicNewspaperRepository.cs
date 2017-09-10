using LibraryBackEnd.Configuration;
using LibraryBackEnd.Core.IRepositories;
using LibraryBackEnd.Core.Models;

namespace LibraryBackEnd.Persistence.Repositories
{
    public class PeriodicNewspaperRepository : GenericRepository<PeriodicNewspaper>, IPeriodicNewspaperRepository
    {
        private ApplicationDbContext _context;

        public PeriodicNewspaperRepository(ApplicationDbContext context)
            : base(context)
        {
            _context = context;
        }
    }
}
