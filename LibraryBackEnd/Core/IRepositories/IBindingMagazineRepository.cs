using LibraryBackEnd.Core.Models;

namespace LibraryBackEnd.Core.IRepositories
{
    public interface IBindingMagazineRepository : IGenericRepository<BindingMagazine>
    {
        BindingMagazine GetByName(string title);

        BindingMagazine GetByNumber(string number);
    }
}
