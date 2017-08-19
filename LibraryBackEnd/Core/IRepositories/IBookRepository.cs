using LibraryBackEnd.Core.BindingModels;
using LibraryBackEnd.Core.Models;
using System.Collections.Generic;

namespace LibraryBackEnd.Core.IRepositories
{
    public interface IBookRepository : IGenericRepository<Book>
    {
        IEnumerable<string> BookTitle();
        IEnumerable<string> GetAccessionNumbers();
        Book GetByAccessionNumber(string accessionNumber);
        object GetBooksInCourse();
        IEnumerable<Book> GetBooksByCourse(string courseName);
        object GetBooksInSubject();
        IEnumerable<Book> GetBooksBySubject(string subject);
        object BookBaughtInYear();
        IEnumerable<Book> GetBooksByYear(int year);
        object GetBooksTitles();
        IEnumerable<Book> GetBooksByTitle(string title);
        object GetDistinctBooksByCourse(string course);
        IEnumerable<Book> GetSearchResults(SearchBindingModel searchBindingModel);
    }
}
