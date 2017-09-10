using LibraryBackEnd.Configuration;
using LibraryBackEnd.Core.IRepositories;
using LibraryBackEnd.Core.Models;
using System.Collections.Generic;
using System.Linq;

namespace LibraryBackEnd.Persistence.Repositories
{
    public class NewspaperMonthRepository : GenericRepository<NewspaperMonth>, INewspaperMonthRepository
    {
        private ApplicationDbContext _context;

        public NewspaperMonthRepository(ApplicationDbContext context)
            : base(context)
        {
            _context = context;
        }

        public IEnumerable<NewspaperMonth> GetByTitle(string title)
        {
            return _context.NewspaperMonths
                .Where(n => n.Title == title)
                .ToList();
        }
    }
}
