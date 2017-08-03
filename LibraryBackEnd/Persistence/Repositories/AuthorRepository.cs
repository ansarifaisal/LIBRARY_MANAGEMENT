using LibraryBackEnd.Configuration;
using LibraryBackEnd.Core.IRepositories;
using LibraryBackEnd.Core.Models;

namespace LibraryBackEnd.Persistence.Repositories
{
    public class AuthorRepository : GenericRepository<Author>, IAuthorRepository
    {
        private ApplicationDbContext _context;

        public AuthorRepository(ApplicationDbContext context)
            : base(context)
        {
            _context = context;
        }
    }
}
