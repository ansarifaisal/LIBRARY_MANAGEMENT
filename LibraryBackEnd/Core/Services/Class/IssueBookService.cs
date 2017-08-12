using LibraryBackEnd.Core.IRepositories;
using LibraryBackEnd.Core.Models;
using LibraryBackEnd.Core.Services.Interface;

namespace LibraryBackEnd.Core.Services.Class
{
    public class IssueBookService : EntityService<IssueBook>, IIssueBookService
    {
        public IssueBookService(IIssueBookRepository repository, IUnitOfWork unitOfWork) : base(repository, unitOfWork)
        {
        }
    }
}
