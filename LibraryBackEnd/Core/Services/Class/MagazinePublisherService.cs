using LibraryBackEnd.Core.IRepositories;
using LibraryBackEnd.Core.Models;
using LibraryBackEnd.Core.Services.Interface;

namespace LibraryBackEnd.Core.Services.Class
{
    public class MagazinePublisherService : EntityService<MagazinePublisher>, IMagazinePublisherService
    {
        private IMagazinePublisherRepository _repository;
        public MagazinePublisherService(IMagazinePublisherRepository repository, IUnitOfWork unitOfWork)
            : base(repository, unitOfWork)
        {
            _repository = repository;
        }
    }
}
