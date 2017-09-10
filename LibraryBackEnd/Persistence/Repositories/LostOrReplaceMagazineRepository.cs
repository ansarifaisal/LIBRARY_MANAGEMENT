using LibraryBackEnd.Configuration;
using LibraryBackEnd.Core.IRepositories;
using LibraryBackEnd.Core.Models;

namespace LibraryBackEnd.Persistence.Repositories
{
    public class LostOrReplaceMagazineRepository : GenericRepository<LostOrReplaceMagazine>, ILostOrReplaceMagazineRepository
    {
        private ApplicationDbContext _context;
        public LostOrReplaceMagazineRepository(ApplicationDbContext context)
            : base(context)
        {
            _context = context;
        }
    }
}
