using LibraryBackEnd.Core.Models;
using System.Collections.Generic;

namespace LibraryBackEnd.Core.Services.Interface
{
    public interface IIssueBookService : IEntityService<IssueBook>
    {
        IEnumerable<IssueBook> GetByRollNumber(string rollNo);
    }
}
