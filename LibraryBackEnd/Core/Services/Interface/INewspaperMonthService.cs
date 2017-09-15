using LibraryBackEnd.Core.Models;
using System;
using System.Collections.Generic;

namespace LibraryBackEnd.Core.Services.Interface
{
    public interface INewspaperMonthService : IEntityService<NewspaperMonth>
    {
        IEnumerable<NewspaperMonth> GetByTitle(string title);

        NewspaperMonth GetByMonth(DateTime date);
    }
}
