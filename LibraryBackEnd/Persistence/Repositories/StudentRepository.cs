using LibraryBackEnd.Configuration;
using LibraryBackEnd.Core.IRepositories;
using LibraryBackEnd.Core.Models;
using System.Collections.Generic;
using System.Linq;

namespace LibraryBackEnd.Persistence.Repositories
{

    public class StudentRepository : GenericRepository<ApplicationUser>, IStudentRepository
    {

        private readonly ApplicationDbContext _context;

        public StudentRepository(ApplicationDbContext context) : base(context)
        {
            _context = context;
        }

        public ApplicationUser GetByRollNo(string rollNumber)
        {
            return _context.Users.Where(u => u.RollNo == rollNumber).SingleOrDefault();
        }

        public ApplicationUser GetByUserName(string userName)
        {
            return _context.Users.Where(u => u.UserName == userName).SingleOrDefault();
        }

        public object GetStudentsInCourse()
        {
            return _context.Users
                .Where(u => u.Role == "STUDENT")
                .GroupBy(u => u.Course)
                .Select(g => new
                {
                    CourseName = g.Key,
                    Count = g.Count()
                })
                .ToList();
        }

        public object GetStudentsInYear()
        {
            return _context.Users
                 .Where(u => u.Role == "STUDENT")
                 .GroupBy(u => u.YearOfAdmission)
                 .Select(g => new
                 {
                     CourseName = g.Key,
                     Count = g.Count()
                 })
                 .ToList();
        }

        public ApplicationUser GetUserById(string Id)
        {
            return _context.Users.Find(Id);
        }

        public IEnumerable<ApplicationUser> GetUsersByRole(string role)
        {
            return _context.Users.Where(u => u.Role == role).ToList();
        }
    }
}
