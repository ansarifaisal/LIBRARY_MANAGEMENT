using LibraryBackEnd.Core.Models;
using System.Collections.Generic;

namespace LibraryBackEnd.Core.Services.Interface
{
    public interface ISubjectService : IEntityService<Subject>
    {
        Subject GetByName(string name);
        IEnumerable<Subject> GetByCourse(string courseName, int semester);
    }
}
