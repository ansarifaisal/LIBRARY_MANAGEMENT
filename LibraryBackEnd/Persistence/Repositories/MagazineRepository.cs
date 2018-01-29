using LibraryBackEnd.Configuration;
using LibraryBackEnd.Core.IRepositories;
using LibraryBackEnd.Core.Models;
using System.Collections.Generic;
using System.Linq;

namespace LibraryBackEnd.Persistence.Repositories
{
    public class MagazineRepository : GenericRepository<Magazine>, IMagazineRepository
    {

        private ApplicationDbContext _context;
        public MagazineRepository(ApplicationDbContext context)
            : base(context)
        {
            _context = context;
        }

        public Magazine GetByNumber(string number)
        {
            return _context.Magazines
                .Where(m => m.LibRef == number)
                .SingleOrDefault();
        }



        public IEnumerable<string> GetMagazineNumbers()
        {
            return _context.Magazines
                .Where(m => m.Status == "Available")
                .Select(m => m.LibRef)
                .ToList();
        }


        public IEnumerable<Magazine> GetMagazines(string title)
        {
            return _context.Magazines
                .Where(m => m.PeriodicTitle == title)
                .ToList();
        }

        public List<Magazine> GetMagazinesById(int periodicId)
        {
            return _context.Magazines
                .Where(m => m.PeriodicId == periodicId)
                .ToList();
        }
    }
}
