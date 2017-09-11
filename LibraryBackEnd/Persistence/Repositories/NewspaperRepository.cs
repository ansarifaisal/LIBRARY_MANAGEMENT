using LibraryBackEnd.Configuration;
using LibraryBackEnd.Core.IRepositories;
using LibraryBackEnd.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;

namespace LibraryBackEnd.Persistence.Repositories
{
    public class NewspaperRepository : GenericRepository<Newspaper>, INewspaperRepository
    {
        private ApplicationDbContext _context;

        public NewspaperRepository(ApplicationDbContext context) : base(context)
        {
            _context = context;
        }

        public IEnumerable<Newspaper> GetByMonth(string title, DateTime month)
        {
            return _context.Newspapers
                .Where(n =>
                n.Title == title
                && n.Date.Month == month.Month
                && n.Date.Year == month.Year)
                .ToList();
        }
    }
}
