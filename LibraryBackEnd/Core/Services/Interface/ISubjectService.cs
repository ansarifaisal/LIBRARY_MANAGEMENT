using LibraryBackEnd.Core.Models;

namespace LibraryBackEnd.Core.Services.Interface
{
    public interface ISubjectService : IEntityService<Subject>
    {
        Subject GetByName(string name);
    }
}
