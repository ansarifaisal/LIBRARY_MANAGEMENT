using LibraryBackEnd.Configuration;
using LibraryBackEnd.Core.IRepositories;
using LibraryBackEnd.Core.Models;

namespace LibraryBackEnd.Persistence.Repositories
{
    public class NewspaperRepository : GenericRepository<Newspaper>, INewspaperRepository
    {
        private ApplicationDbContext _context;

        public NewspaperRepository(ApplicationDbContext context) : base(context)
        {
            _context = context;
        }
    }
}
