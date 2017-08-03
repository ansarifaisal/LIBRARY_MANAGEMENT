using LibraryBackEnd.Configuration;
using LibraryBackEnd.Core.IRepositories;
using LibraryBackEnd.Core.Models;
using System.Linq;

namespace LibraryBackEnd.Persistence.Repositories
{
    public class PublicationRepository : GenericRepository<Publication>, IPublicationRepository
    {
        private readonly ApplicationDbContext _context;

        public PublicationRepository(ApplicationDbContext context) : base(context)
        {
            _context = context;
        }

        public Publication GetByName(string name)
        {
            return _context.Publications
                    .Where(p => p.Name == name)
                    .SingleOrDefault();
        }
    }
}
