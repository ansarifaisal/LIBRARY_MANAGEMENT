using LibraryBackEnd.Core.Models;
using System.Collections.Generic;

namespace LibraryBackEnd.Core.Services.Interface
{
    public interface IReturnBookService : IEntityService<ReturnBook>
    {
        IEnumerable<ReturnBook> GetReturnBook(string accessionNumber);
        IEnumerable<ReturnBook> GetByRollNo(string rollNo);
    }
}
