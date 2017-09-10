using LibraryBackEnd.Core.Models;
using LibraryBackEnd.Core.Services.Interface;
using LibraryBackEnd.Persistence.Repositories;

namespace LibraryBackEnd.Core.Services.Class
{
    public class ReturnMagazineService : EntityService<ReturnMagazine>, IReturnMagazineService
    {
        private ReturnMagazineRepository _repository;
        private IUnitOfWork _unitOfWork;
        public ReturnMagazineService(ReturnMagazineRepository repository, IUnitOfWork unitOfWork)
            : base(repository, unitOfWork)
        {
            _repository = repository;
            _unitOfWork = unitOfWork;
        }
    }
}
