using LibraryBackEnd.Core.Models;
using System.Collections.Generic;

namespace LibraryBackEnd.Core.Services.Interface
{
    public interface IReturnMagazineService : IEntityService<ReturnMagazine>
    {
        IEnumerable<ReturnMagazine> GetMagazineByRollNumber(string rollNo);
    }
}
