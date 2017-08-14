using LibraryBackEnd.Configuration;
using LibraryBackEnd.Core.IRepositories;
using LibraryBackEnd.Core.Models;

namespace LibraryBackEnd.Persistence.Repositories
{
    public class LostOrReplaceRepository : GenericRepository<LostOrReplace>, ILostOrReplaceRepository
    {
        private ApplicationDbContext _context;
        public LostOrReplaceRepository(ApplicationDbContext context)
            : base(context)
        {
            _context = context;
        }
    }
}
