using LibraryBackEnd.Configuration;
using LibraryBackEnd.Core.IRepositories;
using LibraryBackEnd.Core.Models;

namespace LibraryBackEnd.Persistence.Repositories
{

    public class StudentRepository : GenericRepository<ApplicationUser>, IStudentRepository
    {

        private readonly ApplicationDbContext _context;

        public StudentRepository(ApplicationDbContext context) : base(context)
        {
            _context = context;
        }

        public ApplicationUser GetUserById(string Id)
        {
            return _context.Users.Find(Id);
        }
    }
}
