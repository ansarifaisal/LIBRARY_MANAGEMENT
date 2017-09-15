using LibraryBackEnd.Core.Models;
using System.Collections.Generic;

namespace LibraryBackEnd.Core.Services.Interface
{
    public interface IMagazineService : IEntityService<Magazine>
    {
        IEnumerable<Magazine> GetMagazines(string title);
        Magazine GetByNumber(string number);
        IEnumerable<string> GetMagazineNumbers();
    }
}
