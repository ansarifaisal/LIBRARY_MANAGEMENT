using LibraryBackEnd.Core.Models;
using System.Collections.Generic;

namespace LibraryBackEnd.Core.Services.Interface
{
    public interface IRequestService : IEntityService<Request>
    {
        IEnumerable<Request> GetByRollNo(string rollNo);
    }
}
