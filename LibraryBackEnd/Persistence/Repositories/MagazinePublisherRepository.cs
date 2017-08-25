using LibraryBackEnd.Configuration;
using LibraryBackEnd.Core.IRepositories;
using LibraryBackEnd.Core.Models;

namespace LibraryBackEnd.Persistence.Repositories
{
    public class MagazinePublisherRepository : GenericRepository<MagazinePublisher>, IMagazinePublisherRepository
    {
        private ApplicationDbContext _context;

        public MagazinePublisherRepository(ApplicationDbContext context)
            : base(context)
        {
            _context = context;
        }
    }
}
