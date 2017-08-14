using LibraryBackEnd.Configuration;
using LibraryBackEnd.Core.IRepositories;
using LibraryBackEnd.Core.Models;
using System.Collections.Generic;
using System.Linq;

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

        public IEnumerable<string> BookTitle()
        {
            return _context.Books.Select(b => b.Title).Distinct().ToList();
        }

        public Book GetByAccessionNumber(string accessionNumber)
        {
            return _context.Books
                .Where(b => b.AccessionNumber == accessionNumber)
                .SingleOrDefault();
        }


    }
}
