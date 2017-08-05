using LibraryBackEnd.Core.Models;

namespace LibraryBackEnd.Core.Services.Interface
{
    public interface ICourseService : IEntityService<Course>
    {
        Course GetByName(string name);
    }
}
