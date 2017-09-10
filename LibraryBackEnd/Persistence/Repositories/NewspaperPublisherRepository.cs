using LibraryBackEnd.Configuration;
using LibraryBackEnd.Core.IRepositories;
using LibraryBackEnd.Core.Models;

namespace LibraryBackEnd.Persistence.Repositories
{
    public class NewspaperPublisherRepository : GenericRepository<NewspaperPublisher>, INewspaperPublisherRepository
    {
        private ApplicationDbContext _context;
        public NewspaperPublisherRepository(ApplicationDbContext context)
            : base(context)
        {
            _context = context;
        }
    }
}
