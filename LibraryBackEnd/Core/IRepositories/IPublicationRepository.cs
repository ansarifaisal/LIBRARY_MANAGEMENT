using LibraryBackEnd.Core.Models;

namespace LibraryBackEnd.Core.IRepositories
{
    public interface IPublicationRepository : IGenericRepository<Publication>
    {
        Publication GetByName(string name);
    }
}