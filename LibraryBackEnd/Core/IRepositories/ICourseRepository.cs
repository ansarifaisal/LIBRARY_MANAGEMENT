using LibraryBackEnd.Core.Models;

namespace LibraryBackEnd.Core.IRepositories
{
    public interface ICourseRepository : IGenericRepository<Course>
    {
        Course GetByName(string name);
    }
}
