using LibraryBackEnd.Configuration;
using LibraryBackEnd.Core.Models;

namespace LibraryBackEnd.Persistence.Repositories
{
    public class ReturnMagazineRepository : GenericRepository<ReturnMagazine>, IReturnMagazine
    {
        private ApplicationDbContext _context;
        public ReturnMagazineRepository(ApplicationDbContext context)
            : base(context)
        {
            _context = context;
        }
    }
}
