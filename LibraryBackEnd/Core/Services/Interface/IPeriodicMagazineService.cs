using LibraryBackEnd.Core.Models;

namespace LibraryBackEnd.Core.Services.Interface
{
    public interface IPeriodicMagazineService : IEntityService<PeriodicMagazine>
    {
        PeriodicMagazine GetByTitle(string title);
    }
}
