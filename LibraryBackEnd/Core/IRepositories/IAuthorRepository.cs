using LibraryBackEnd.Core.Models;
using System.Collections.Generic;

namespace LibraryBackEnd.Core.IRepositories
{
    public interface IAuthorRepository : IGenericRepository<Author>
    {
        Author GetByName(string name);
        IEnumerable<Author> matchName(string name);
    }
}
