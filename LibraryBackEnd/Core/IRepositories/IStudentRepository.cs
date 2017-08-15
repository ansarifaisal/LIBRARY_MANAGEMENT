using LibraryBackEnd.Core.Models;
using System.Collections.Generic;

namespace LibraryBackEnd.Core.IRepositories
{
    public interface IStudentRepository : IGenericRepository<ApplicationUser>
    {
        ApplicationUser GetUserById(string Id);
        ApplicationUser GetByUserName(string userName);
        ApplicationUser GetByRollNo(string rollNumber);
        IEnumerable<ApplicationUser> GetUsersByRole(string role);
        object GetStudentsInCourse();
        object GetStudentsInYear();
    }
}