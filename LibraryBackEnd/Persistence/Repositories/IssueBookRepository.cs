using LibraryBackEnd.Configuration;
using LibraryBackEnd.Core.IRepositories;
using LibraryBackEnd.Core.Models;

namespace LibraryBackEnd.Persistence.Repositories
{
    public class IssueBookRepository : GenericRepository<IssueBook>, IIssueBookRepository
    {
        private ApplicationDbContext _context;

        public IssueBookRepository(ApplicationDbContext context)
            : base(context)
        {
            _context = context;
        }
    }
}
