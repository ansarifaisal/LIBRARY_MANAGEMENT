using LibraryBackEnd.Configuration;
using LibraryBackEnd.Core.IRepositories;
using LibraryBackEnd.Core.Models;
using System.Linq;

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

        public PeriodicNewspaper GetByName(string name)
        {
            return _context.PeriodicNewspapers
                .Where(p => p.Title == name)
                .SingleOrDefault();
        }
    }
}
