using LibraryBackEnd.Configuration;
using LibraryBackEnd.Core.BindingModels;
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

        public IEnumerable<string> GetAccessionNumbers()
        {
            return _context.Books
                .Where(b => b.Status == "Available")
                .Select(b => b.AccessionNumber)
                .Distinct()
                .ToList();
        }

        public Book GetByAccessionNumber(string accessionNumber)
        {
            return _context.Books
                .Where(b => b.AccessionNumber == accessionNumber)
                .SingleOrDefault();
        }

        public object GetBooksInCourse()
        {
            return _context.Books
                .GroupBy(b => b.Course)
                .Select(g => new
                {
                    CourseName = g.Key,
                    Count = g.Count()
                })
                .ToList();
        }

        public object GetBooksInSubject()
        {
            return _context.Books
               .GroupBy(b => b.Subject)
               .Select(g => new
               {
                   Subject = g.Key,
                   Count = g.Count()
               })
               .ToList();
        }

        public object BookBaughtInYear()
        {
            return _context.Books
                   .GroupBy(b => b.BillDate.Year).Select(g => new
                   {
                       Year = g.Key,
                       Count = g.Count()
                   })
                   .ToList();
        }

        public object GetBooksTitles()
        {
            return _context.Books
               .GroupBy(b => b.Title)
               .Select(g => new
               {
                   Title = g.Key,
                   Count = g.Count()
               })
               .ToList();
        }

        public IEnumerable<Book> GetBooksByCourse(string courseName)
        {
            return _context.Books
                .Where(b => b.Course == courseName)
                .ToList();
        }

        public IEnumerable<Book> GetBooksBySubject(string subject)
        {
            return _context.Books
                 .Where(b => b.Subject == subject)
                 .ToList();
        }

        public IEnumerable<Book> GetBooksByYear(int year)
        {
            return _context.Books
                 .Where(b => b.BillDate.Year == year)
                 .ToList();
        }

        public IEnumerable<Book> GetBooksByTitle(string title)
        {
            return _context.Books
                 .Where(b => b.Title == title)
                 .ToList();
        }

        public IEnumerable<Book> GetSearchResults(SearchBindingModel searchBindingModel)
        {
            return _context.Books
                    .Where(u => u.AccessionNumber == searchBindingModel.AccessionNumber
                    || u.Title == searchBindingModel.Title
                    || u.Course == searchBindingModel.Course
                    || u.Status == searchBindingModel.Status
                    || u.TypeOfBook == searchBindingModel.Type)
                    .ToList();
        }

        public object GetDistinctBooksByCourse(string course)
        {
            return _context.Books
                  .Where(b => b.Course == course)
                  .Distinct()
                  .ToList();
        }

        public object GetBookTypes()
        {
            return _context.Books
                .GroupBy(b => b.TypeOfBook)
                .Select(g => new
                {
                    Type = g.Key,
                    Count = g.Count()
                })
                .ToList();
        }

        public IEnumerable<Book> GetBooksByType(string type)
        {
            return _context.Books
                .Where(b => b.TypeOfBook == type)
                .ToList();
        }
    }
}
