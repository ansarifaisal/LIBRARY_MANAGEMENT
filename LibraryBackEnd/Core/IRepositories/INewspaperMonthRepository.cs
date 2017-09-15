using LibraryBackEnd.Core.Models;
using System;
using System.Collections.Generic;

namespace LibraryBackEnd.Core.IRepositories
{
    public interface INewspaperMonthRepository : IGenericRepository<NewspaperMonth>
    {
        IEnumerable<NewspaperMonth> GetByTitle(string title);

        NewspaperMonth GetByMonth(DateTime date);
    }
}
