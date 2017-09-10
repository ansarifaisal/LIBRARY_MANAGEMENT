using LibraryBackEnd.Core.IRepositories;
using LibraryBackEnd.Core.Models;
using LibraryBackEnd.Core.Services.Interface;

namespace LibraryBackEnd.Core.Services.Class
{
    public class NewspaperService : EntityService<Newspaper>, INewspaperService
    {
        private INewspaperRepository _repository;
        private IUnitOfWork _unitOfWork;
        public NewspaperService(INewspaperRepository repository, IUnitOfWork unitOfWork)
            : base(repository, unitOfWork)
        {
            _repository = repository;
            _unitOfWork = unitOfWork;
        }
    }
}
