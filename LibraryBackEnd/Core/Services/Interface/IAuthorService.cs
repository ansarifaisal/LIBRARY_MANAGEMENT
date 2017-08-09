using LibraryBackEnd.Core.Models;
using System.Collections.Generic;

namespace LibraryBackEnd.Core.Services.Interface
{
    public interface IAuthorService : IEntityService<Author>
    {
        Author GetByName(string name);
        IEnumerable<Author> matchName(string name);
    }
}
