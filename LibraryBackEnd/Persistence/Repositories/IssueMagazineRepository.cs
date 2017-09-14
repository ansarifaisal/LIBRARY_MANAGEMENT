using LibraryBackEnd.Configuration;
using LibraryBackEnd.Core.IRepositories;
using LibraryBackEnd.Core.Models;
using System.Collections.Generic;
using System.Linq;

namespace LibraryBackEnd.Persistence.Repositories
{
    public class IssueMagazineRepository : GenericRepository<IssueMagazine>, IIssueMagazineRepository
    {

        private ApplicationDbContext _context;
        public IssueMagazineRepository(ApplicationDbContext context)
            : base(context)
        {
            _context = context;
        }

        public IEnumerable<IssueMagazine> GetMagazinesByRollNo(string rollNo)
        {
            return _context.IssueMagazines
                .Where(m => m.RollNo == rollNo)
                .ToList();
        }
    }
}
