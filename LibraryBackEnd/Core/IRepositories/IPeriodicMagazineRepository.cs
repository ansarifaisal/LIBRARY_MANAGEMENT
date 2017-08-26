using LibraryBackEnd.Core.Models;

namespace LibraryBackEnd.Core.IRepositories
{
    public interface IPeriodicMagazineRepository : IGenericRepository<PeriodicMagazine>
    {
        PeriodicMagazine GetByTitle(string title);
    }
}
