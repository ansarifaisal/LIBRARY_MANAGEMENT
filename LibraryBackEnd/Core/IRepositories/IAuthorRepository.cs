using LibraryBackEnd.Core.Models;

namespace LibraryBackEnd.Core.IRepositories
{
    public interface IAuthorRepository : IGenericRepository<Author>
    {
        Author GetByName(string name);
    }
}
