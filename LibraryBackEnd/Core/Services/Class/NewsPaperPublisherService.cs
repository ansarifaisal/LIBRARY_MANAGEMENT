using LibraryBackEnd.Core.IRepositories;
using LibraryBackEnd.Core.Models;
using LibraryBackEnd.Core.Services.Interface;

namespace LibraryBackEnd.Core.Services.Class
{
    public class NewsPaperPublisherService : EntityService<NewspaperPublisher>, INewspaperPublisherService
    {
        private INewspaperPublisherRepository _repository;
        private IUnitOfWork _unitOfWork;
        public NewsPaperPublisherService(INewspaperPublisherRepository repository, IUnitOfWork unitOfWork) : base(repository, unitOfWork)
        {
            _repository = repository;
            _unitOfWork = unitOfWork;
        }

        public NewspaperPublisher GetByName(string name)
        {
            return _repository.GetByName(name);
        }
    }
}
