using LibraryBackEnd.Configuration;
using LibraryBackEnd.Core.IRepositories;
using LibraryBackEnd.Core.Models;
using System;
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

        public NewspaperMonth GetByMonth(DateTime date)
        {
            return _context.NewspaperMonths
                .Where(m => m.Month.Month == date.Month && m.Month.Year == date.Year)
                .SingleOrDefault();
        }

        public IEnumerable<NewspaperMonth> GetByTitle(string title)
        {
            return _context.NewspaperMonths
                .Where(n => n.Title == title)
                .ToList();
        }
    }
}
