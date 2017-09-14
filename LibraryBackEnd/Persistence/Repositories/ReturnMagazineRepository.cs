using LibraryBackEnd.Configuration;
using LibraryBackEnd.Core.IRepositories;
using LibraryBackEnd.Core.Models;
using System.Collections.Generic;
using System.Linq;

namespace LibraryBackEnd.Persistence.Repositories
{
    public class ReturnMagazineRepository : GenericRepository<ReturnMagazine>, IReturnMagazineRepository
    {
        private ApplicationDbContext _context;
        public ReturnMagazineRepository(ApplicationDbContext context)
            : base(context)
        {
            _context = context;
        }

        public IEnumerable<ReturnMagazine> GetMagazineByRollNumber(string rollNo)
        {
            return _context.ReturnMagazines
                .Where(m => m.RollNo == rollNo)
                .ToList();
        }
    }
}
