using LibraryBackEnd.Core.IRepositories;
using LibraryBackEnd.Core.Models;
using LibraryBackEnd.Core.Services.Interface;

namespace LibraryBackEnd.Core.Services.Class
{
    public class ReturnBookService : EntityService<ReturnBook>, IReturnBookService
    {
        private IReturnBookRepository _repository;
        public ReturnBookService(IReturnBookRepository repository, IUnitOfWork unitOfWork)
            : base(repository, unitOfWork)
        {
            _repository = repository;
        }
    }
}
