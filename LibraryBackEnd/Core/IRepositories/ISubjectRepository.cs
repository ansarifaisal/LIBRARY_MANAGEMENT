using LibraryBackEnd.Core.Models;

namespace LibraryBackEnd.Core.IRepositories
{
    public interface ISubjectRepository : IGenericRepository<Subject>
    {
        Subject GetByName(string name);
    }
}
