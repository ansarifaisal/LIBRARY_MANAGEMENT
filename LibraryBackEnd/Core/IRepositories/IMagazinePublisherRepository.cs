using LibraryBackEnd.Core.Models;

namespace LibraryBackEnd.Core.IRepositories
{
    public interface IMagazinePublisherRepository : IGenericRepository<MagazinePublisher>
    {
        MagazinePublisher GetByTitle(string title);
    }
}
