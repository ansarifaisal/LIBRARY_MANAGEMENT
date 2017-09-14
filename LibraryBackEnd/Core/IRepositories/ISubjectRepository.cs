using LibraryBackEnd.Core.Models;
using System.Collections.Generic;

namespace LibraryBackEnd.Core.IRepositories
{
    public interface ISubjectRepository : IGenericRepository<Subject>
    {
        Subject GetByName(string name);
        IEnumerable<Subject> GetByCourse(string courseName, int semester);
        Subject checkExisting(string name, string courseName, int semester);
    }
}
