using LibraryBackEnd.Core.Models;
using System.Collections.Generic;

namespace LibraryBackEnd.Core.Services.Interface
{
    public interface IBookService : IEntityService<Book>
    {
        IEnumerable<string> BookTitle();
        Book GetByAccessionNumber(string accessionNumber);
        object GetBooksInCourse();
        IEnumerable<Book> GetBooksByCourse(string courseName);
        object GetBooksInSubject();
        IEnumerable<Book> GetBooksBySubject(string subject);
        object BookBaughtInYear();
        IEnumerable<Book> GetBooksByYear(int year);
        object GetBooksTitles();
        IEnumerable<Book> GetBooksByTitle(string title);
    }
}
