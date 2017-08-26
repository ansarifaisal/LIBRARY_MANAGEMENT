using LibraryBackEnd.Configuration;
using LibraryBackEnd.Core.IRepositories;
using LibraryBackEnd.Core.Models;
using System.Linq;

namespace LibraryBackEnd.Persistence.Repositories
{
    public class PeriodicMagazineRepository : GenericRepository<PeriodicMagazine>, IPeriodicMagazineRepository
    {
        private ApplicationDbContext _context;
        public PeriodicMagazineRepository(ApplicationDbContext context)
            : base(context)
        {
            _context = context;
        }

        public PeriodicMagazine GetByTitle(string title)
        {
            return _context.PeriodicMagazines
                .Where(p => p.Title == title)
                .SingleOrDefault();
        }
    }
}
