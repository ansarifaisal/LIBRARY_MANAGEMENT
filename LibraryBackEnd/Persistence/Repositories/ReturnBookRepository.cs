using LibraryBackEnd.Configuration;
using LibraryBackEnd.Core.IRepositories;
using LibraryBackEnd.Core.Models;

namespace LibraryBackEnd.Persistence.Repositories
{
    public class ReturnBookRepository : GenericRepository<ReturnBook>, IReturnBookRepository
    {
        private ApplicationDbContext _context;

        public ReturnBookRepository(ApplicationDbContext context)
            : base(context)
        {
            _context = context;
        }
    }
}
