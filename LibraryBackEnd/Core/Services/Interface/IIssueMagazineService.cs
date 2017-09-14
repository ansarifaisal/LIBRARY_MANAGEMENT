using LibraryBackEnd.Core.Models;
using System.Collections.Generic;

namespace LibraryBackEnd.Core.Services.Interface
{
    public interface IIssueMagazineService : IEntityService<IssueMagazine>
    {
        IEnumerable<IssueMagazine> GetMagazinesByRollNo(string rollNo);
    }
}
