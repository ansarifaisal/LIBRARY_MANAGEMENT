using LibraryBackEnd.Core.Models;

namespace LibraryBackEnd.Core.IRepositories
{
    public interface INewspaperPublisherRepository : IGenericRepository<NewspaperPublisher>
    {
        NewspaperPublisher GetByName(string name);
    }
}
