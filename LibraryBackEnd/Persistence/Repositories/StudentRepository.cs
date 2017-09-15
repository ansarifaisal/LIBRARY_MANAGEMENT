using LibraryBackEnd.Configuration;
using LibraryBackEnd.Core.BindingModels;
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

        public IEnumerable<string> GetFullName()
        {
            return _context.Users.Select(u => u.FullName).ToList();
        }

        public IEnumerable<string> GetRollNos()
        {
            return _context.Users
                .Where(u => u.Status == "APPROVED" && u.IssueCount < 2)
                .Select(u => u.RollNo)
                .ToList();
        }

        public IEnumerable<ApplicationUser> GetSearchResults(SearchStudentBindingModel searchStudentBindingModel)
        {
            return _context.Users
                .Where(u => u.FullName == searchStudentBindingModel.FullName
                || u.Course == searchStudentBindingModel.Course
                || u.Role == searchStudentBindingModel.Role
                || u.RollNo == searchStudentBindingModel.RollNo
                || u.Status == searchStudentBindingModel.Status)
                .ToList();
        }

        public IEnumerable<ApplicationUser> GetStudentsByCourse(string courseName)
        {
            return _context.Users
                .Where(u => u.Role == "STUDENT" && u.Course == courseName)
                .ToList();
        }

        public IEnumerable<ApplicationUser> GetStudentsByYear(int year)
        {
            return _context.Users
                .Where(u => u.Role == "STUDENT" && u.YearOfAdmission == year)
                .ToList();
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
                     Year = g.Key,
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
