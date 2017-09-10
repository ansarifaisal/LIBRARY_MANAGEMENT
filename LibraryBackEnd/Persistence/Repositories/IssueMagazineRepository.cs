using LibraryBackEnd.Configuration;
using LibraryBackEnd.Core.IRepositories;
using LibraryBackEnd.Core.Models;

namespace LibraryBackEnd.Persistence.Repositories
{
    public class IssueMagazineRepository : GenericRepository<IssueMagazine>, IIssueMagazineRepository
    {

        private ApplicationDbContext _context;
        public IssueMagazineRepository(ApplicationDbContext context)
            : base(context)
        {
            _context = context;
        }
    }
}
