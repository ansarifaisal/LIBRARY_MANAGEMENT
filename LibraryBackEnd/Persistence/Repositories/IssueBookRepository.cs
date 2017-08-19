using LibraryBackEnd.Configuration;
using LibraryBackEnd.Core.IRepositories;
using LibraryBackEnd.Core.Models;
using System.Collections.Generic;
using System.Linq;

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

        public IEnumerable<IssueBook> GetByRollNumber(string rollNo)
        {
            return _context.IssueBooks
                .Where(i => i.RollNo == rollNo)
                .ToList();
        }
    }
}
