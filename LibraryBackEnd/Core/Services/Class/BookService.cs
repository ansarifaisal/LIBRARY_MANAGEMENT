using LibraryBackEnd.Core.IRepositories;
using LibraryBackEnd.Core.Models;
using LibraryBackEnd.Core.Services.Interface;

namespace LibraryBackEnd.Core.Services.Class
{
    public class BookService : EntityService<Book>, IBookService
    {
        private IBookRepository _bookRepository;
        private IUnitOfWork _unitOfWork;

        public BookService(IBookRepository repository, IUnitOfWork unitOfWork)
            : base(repository, unitOfWork)
        {
            _bookRepository = repository;
            _unitOfWork = unitOfWork;
        }

    }
}
