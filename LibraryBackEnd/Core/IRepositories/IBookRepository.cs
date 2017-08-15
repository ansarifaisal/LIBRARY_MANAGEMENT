using LibraryBackEnd.Core.Models;
using System.Collections.Generic;

namespace LibraryBackEnd.Core.IRepositories
{
    public interface IBookRepository : IGenericRepository<Book>
    {
        IEnumerable<string> BookTitle();
        Book GetByAccessionNumber(string accessionNumber);
        object GetBooksInCourse();
        object GetBooksInSubject();
        object BookBaughtInYear();
    }
}
