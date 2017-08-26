using LibraryBackEnd.Core.IRepositories;
using LibraryBackEnd.Core.Models;
using LibraryBackEnd.Core.Services.Interface;

namespace LibraryBackEnd.Core.Services.Class
{
    public class MagazinePublisherService : EntityService<MagazinePublisher>, IMagazinePublisherService
    {
        private IMagazinePublisherRepository _repository;
        private IUnitOfWork _unitOfWork;
        public MagazinePublisherService(IMagazinePublisherRepository repository, IUnitOfWork unitOfWork)
            : base(repository, unitOfWork)
        {
            _repository = repository;
            _unitOfWork = unitOfWork;
        }

        public MagazinePublisher GetByTitle(string title)
        {
            return _repository.GetByTitle(title);
        }
    }
}
