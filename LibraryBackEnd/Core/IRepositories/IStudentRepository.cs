using LibraryBackEnd.Core.Models;

namespace LibraryBackEnd.Core.IRepositories
{
    public interface IStudentRepository : IGenericRepository<ApplicationUser>
    {
        ApplicationUser GetUserById(string Id);
        ApplicationUser GetByUserName(string userName);
        ApplicationUser GetByRollNo(string rollNumber);
    }
}