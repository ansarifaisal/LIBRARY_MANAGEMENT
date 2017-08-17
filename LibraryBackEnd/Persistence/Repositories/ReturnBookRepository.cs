using LibraryBackEnd.Configuration;
using LibraryBackEnd.Core.IRepositories;
using LibraryBackEnd.Core.Models;
using System.Collections.Generic;
using System.Linq;

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

        public IEnumerable<ReturnBook> GetReturnBook(string accessionNumber)
        {
            return _context.ReturnBooks
                .Where(r => r.AccessionNumber == accessionNumber)
                .ToList();
        }
    }
}
