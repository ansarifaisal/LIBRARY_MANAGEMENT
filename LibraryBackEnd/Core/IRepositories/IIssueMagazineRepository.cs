using LibraryBackEnd.Core.Models;
using System.Collections.Generic;

namespace LibraryBackEnd.Core.IRepositories
{
    public interface IIssueMagazineRepository : IGenericRepository<IssueMagazine>
    {
        IEnumerable<IssueMagazine> GetMagazinesByRollNo(string rollNo);
    }
}
