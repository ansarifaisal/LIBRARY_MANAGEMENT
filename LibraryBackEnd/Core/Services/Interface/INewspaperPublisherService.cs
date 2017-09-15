using LibraryBackEnd.Core.Models;

namespace LibraryBackEnd.Core.Services.Interface
{
    public interface INewspaperPublisherService : IEntityService<NewspaperPublisher>
    {
        NewspaperPublisher GetByName(string name);
    }
}
