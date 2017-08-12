using LibraryBackEnd.Configuration;
using LibraryBackEnd.Core.IRepositories;
using LibraryBackEnd.Core.Models;

namespace LibraryBackEnd.Persistence.Repositories
{
    public class IssueBookRepository : GenericRepository<IssueBook>, IIssueBookRepository
    {
        public IssueBookRepository(ApplicationDbContext context)
            : base(context)
        {

        }
    }
}
