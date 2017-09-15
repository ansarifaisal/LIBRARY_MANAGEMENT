using LibraryBackEnd.Core.Models;
using System.Collections.Generic;

namespace LibraryBackEnd.Core.IRepositories
{
    public interface IMagazineRepository : IGenericRepository<Magazine>
    {
        IEnumerable<Magazine> GetMagazines(string title);
        Magazine GetByNumber(string number);
        IEnumerable<string> GetMagazineNumbers();
    }
}
