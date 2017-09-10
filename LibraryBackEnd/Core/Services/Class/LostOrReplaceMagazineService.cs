using LibraryBackEnd.Core.IRepositories;
using LibraryBackEnd.Core.Models;
using LibraryBackEnd.Core.Services.Interface;

namespace LibraryBackEnd.Core.Services.Class
{
    public class LostOrReplaceMagazineService : EntityService<LostOrReplaceMagazine>, ILostOrReplaceMagazineService
    {
        private ILostOrReplaceMagazineRepository _repository;
        private IUnitOfWork _unitOfWork;
        public LostOrReplaceMagazineService(
            ILostOrReplaceMagazineRepository repository,
            IUnitOfWork unitOfWork)
            : base(repository, unitOfWork)
        {
            _repository = repository;
            _unitOfWork = unitOfWork;
        }
    }
}
