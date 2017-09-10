using LibraryBackEnd.Core.IRepositories;
using LibraryBackEnd.Core.Models;
using LibraryBackEnd.Core.Services.Interface;

namespace LibraryBackEnd.Core.Services.Class
{
    public class IssueMagazineService : EntityService<IssueMagazine>, IIssueMagazineService
    {
        private IIssueMagazineRepository _repository;
        private IUnitOfWork _unitOfWork;

        public IssueMagazineService(IIssueMagazineRepository repository, IUnitOfWork unitOfWork)
            : base(repository, unitOfWork)
        {
            _repository = repository;
            _unitOfWork = unitOfWork;
        }
    }
}
