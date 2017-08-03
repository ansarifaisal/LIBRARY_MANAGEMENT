using LibraryBackEnd.Core.IRepositories;
using LibraryBackEnd.Core.Models;
using LibraryBackEnd.Core.Services.Interface;

namespace LibraryBackEnd.Core.Services.Class
{
    public class AuthorService : EntityService<Author>, IAuthorService
    {
        private IAuthorRepository _authorRepository;
        private IUnitOfWork _unitOfWork;

        public AuthorService(IAuthorRepository repository, IUnitOfWork unitOfWork)
            : base(repository, unitOfWork)
        {
            _authorRepository = repository;
            _unitOfWork = unitOfWork;
        }
    }
}
