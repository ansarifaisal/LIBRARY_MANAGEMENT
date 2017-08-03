using LibraryBackEnd.Core.Models;

namespace LibraryBackEnd.Core.Services.Interface
{
    public interface IPublicationService : IEntityService<Publication>
    {
        Publication GetByName(string name);
    }
}