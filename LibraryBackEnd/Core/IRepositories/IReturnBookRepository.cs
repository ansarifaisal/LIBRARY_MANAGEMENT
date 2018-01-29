using LibraryBackEnd.Core.Models;
using System.Collections.Generic;

namespace LibraryBackEnd.Core.IRepositories
{
    public interface IReturnBookRepository : IGenericRepository<ReturnBook>
    {
        IEnumerable<ReturnBook> GetReturnBook(string accessionNumber);
        IEnumerable<ReturnBook> GetByRollNo(string rollNo);

        object returnedBookInYear();
        IEnumerable<ReturnBook> GetBookInYear(int year);

    }
}
