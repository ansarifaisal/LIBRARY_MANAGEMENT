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

        public IEnumerable<ReturnBook> GetByRollNo(string rollNo)
        {
            return _context.ReturnBooks
                .Where(r => r.RollNo == rollNo)
                .ToList();
        }

        public IEnumerable<ReturnBook> GetReturnBook(string accessionNumber)
        {
            return _context.ReturnBooks
                .Where(r => r.AccessionNumber == accessionNumber)
                .ToList();
        }



        public object returnedBookInYear()
        {
            return _context.ReturnBooks
                     .GroupBy(r => r.ReturnDate.Year)
                     .Select(g => new
                     {
                         ReturnedYear = g.Key,
                         Count = g.Count()
                     })
                     .OrderBy(r => r.ReturnedYear)
                     .ToList();
        }



        public IEnumerable<ReturnBook> GetBookInYear(int year)
        {
            return _context.ReturnBooks
                .Where(r => r.ActualReturnDate.Year == year)
                .OrderBy(r => r.ActualReturnDate)
                .ToList();
        }

    }
}
