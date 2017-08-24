using LibraryBackEnd.Core.Models;
using System.Collections.Generic;

namespace LibraryBackEnd.Core.IRepositories
{
    public interface IRequestRepository : IGenericRepository<Request>
    {
        IEnumerable<Request> GetByRollNo(string rollNo);
    }
}
