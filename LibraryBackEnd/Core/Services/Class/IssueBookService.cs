using LibraryBackEnd.Core.IRepositories;
using LibraryBackEnd.Core.Models;
using LibraryBackEnd.Core.Services.Interface;

namespace LibraryBackEnd.Core.Services.Class
{
    public class IssueBookService : EntityService<IssueBook>, IIssueBookService
    {
        private IIssueBookRepository _repository;
        private IUnitOfWork _unitOfWork;
        public IssueBookService(IIssueBookRepository repository, IUnitOfWork unitOfWork)
            : base(repository, unitOfWork)
        {
            _repository = repository;
            _unitOfWork = unitOfWork;
        }



    }
}
