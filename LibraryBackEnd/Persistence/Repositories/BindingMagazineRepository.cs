using LibraryBackEnd.Configuration;
using LibraryBackEnd.Core.IRepositories;
using LibraryBackEnd.Core.Models;
using System.Linq;

namespace LibraryBackEnd.Persistence.Repositories
{
    public class BindingMagazineRepository : GenericRepository<BindingMagazine>, IBindingMagazineRepository
    {
        private ApplicationDbContext _context;
        public BindingMagazineRepository(ApplicationDbContext context) : base(context)
        {
            _context = context;

        }

        public BindingMagazine GetByName(string title)
        {
            return _context.BindingMagazines
                    .Where(b => b.Title == title)
                    .SingleOrDefault();

        }

        public BindingMagazine GetByNumber(string number)
        {
            return _context.BindingMagazines
                 .Where(b => b.AccessionNumber == number)
                .SingleOrDefault();
        }
    }
}
