using LibraryBackEnd.Core.Models;
using System.Collections.Generic;

namespace LibraryBackEnd.Core.IRepositories
{
    public interface IReturnMagazineRepository : IGenericRepository<ReturnMagazine>
    {
        IEnumerable<ReturnMagazine> GetMagazineByRollNumber(string rollNo);
    }
}
