using LibraryBackEnd.Core.Models;
using System.Collections.Generic;

namespace LibraryBackEnd.Core.IRepositories
{
    public interface INewspaperMonthRepository : IGenericRepository<NewspaperMonth>
    {
        IEnumerable<NewspaperMonth> GetByTitle(string title);
    }
}
