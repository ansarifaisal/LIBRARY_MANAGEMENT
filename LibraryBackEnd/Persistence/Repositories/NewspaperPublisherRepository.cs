using LibraryBackEnd.Configuration;
using LibraryBackEnd.Core.IRepositories;
using LibraryBackEnd.Core.Models;
using System.Linq;

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

        public NewspaperPublisher GetByName(string name)
        {
            return _context.NewsPaperPublishers
                .Where(n => n.Title == name)
                .SingleOrDefault();
        }
    }
}
