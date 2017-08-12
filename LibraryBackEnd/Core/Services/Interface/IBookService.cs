using LibraryBackEnd.Core.Models;
using System.Collections.Generic;

namespace LibraryBackEnd.Core.Services.Interface
{
    public interface IBookService : IEntityService<Book>
    {
        IEnumerable<string> BookTitle();
        Book GetByAccessionNumber(string accessionNumber);
    }
}
