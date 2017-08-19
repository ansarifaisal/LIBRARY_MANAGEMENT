using LibraryBackEnd.Core.Models;
using System.Collections.Generic;

namespace LibraryBackEnd.Core.IRepositories
{
    public interface IIssueBookRepository : IGenericRepository<IssueBook>
    {
        IEnumerable<IssueBook> GetByRollNumber(string rollNo);
    }
}
