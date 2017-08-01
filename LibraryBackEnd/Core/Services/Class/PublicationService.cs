using LibraryBackEnd.Core.IRepositories;
using LibraryBackEnd.Core.Models;
using LibraryBackEnd.Core.Services.Interface;

namespace LibraryBackEnd.Core.Services.Class
{
    public class PublicationService : EntityService<Publication>, IPublicationService
    {
        private IPublicationRepository _repository;
        private IUnitOfWork _unitOfWork;

        public PublicationService(IPublicationRepository repository, IUnitOfWork unitOfWork)
            : base(repository, unitOfWork)
        {
            _repository = repository;
            _unitOfWork = unitOfWork;
        }
    }
}
