using LibraryBackEnd.Configuration;
using LibraryBackEnd.Core.IRepositories;
using LibraryBackEnd.Core.Models;
using System.Collections.Generic;
using System.Linq;

namespace LibraryBackEnd.Persistence.Repositories
{
    public class RequestRepository : GenericRepository<Request>, IRequestRepository
    {
        private ApplicationDbContext _context;

        public RequestRepository(ApplicationDbContext context) : base(context)
        {
            _context = context;
        }

        public IEnumerable<Request> GetByRollNo(string rollNo)
        {
            return _context.Requests
                .Where(r => r.RollNo == rollNo)
                .ToList();
        }
    }
}
