using LibraryBackEnd.Core.Models;

namespace LibraryBackEnd.Core.Services.Interface
{
    public interface IBindingMagazineService : IEntityService<BindingMagazine>
    {
        BindingMagazine GetByName(string title);

        BindingMagazine GetByNumber(string number);
    }
}
