using LibraryBackEnd.Configuration;
using LibraryBackEnd.Core.IRepositories;
using LibraryBackEnd.Core.Models;

namespace LibraryBackEnd.Persistence.Repositories
{
    public class BookRepository : GenericRepository<Book>, IBookRepository
    {
        private ApplicationDbContext _context;

        public BookRepository(ApplicationDbContext context)
            : base(context)
        {
            _context = context;
        }
    }
}
