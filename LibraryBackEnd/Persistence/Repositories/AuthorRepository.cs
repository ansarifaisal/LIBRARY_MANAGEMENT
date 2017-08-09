using LibraryBackEnd.Configuration;
using LibraryBackEnd.Core.IRepositories;
using LibraryBackEnd.Core.Models;
using System.Collections.Generic;
using System.Linq;

namespace LibraryBackEnd.Persistence.Repositories
{
    public class AuthorRepository : GenericRepository<Author>, IAuthorRepository
    {
        private ApplicationDbContext _context;

        public AuthorRepository(ApplicationDbContext context)
            : base(context)
        {
            _context = context;
        }

        public Author GetByName(string name)
        {
            return _context.Authors
                    .Where(a => a.Name == name)
                    .SingleOrDefault();

        }

        public IEnumerable<Author> matchName(string name)
        {
            return _context.Authors
                .Where(a => a.Name.Contains(name));
        }
    }
}
