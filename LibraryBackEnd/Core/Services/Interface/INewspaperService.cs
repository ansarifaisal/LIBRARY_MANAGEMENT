using LibraryBackEnd.Core.Models;
using System;
using System.Collections.Generic;

namespace LibraryBackEnd.Core.Services.Interface
{
    public interface INewspaperService : IEntityService<Newspaper>
    {
        IEnumerable<Newspaper> GetByMonth(string title, DateTime month);

        Newspaper GetDate(DateTime date, DateTime month, string publisher);
    }
}
