using LibraryBackEnd.Core.IRepositories;
using LibraryBackEnd.Core.Models;
using LibraryBackEnd.Core.Services.Interface;

namespace LibraryBackEnd.Core.Services.Class
{
    public class PeriodicMagazineService : EntityService<PeriodicMagazine>, IPeriodicMagazineService
    {
        private IPeriodicMagazineRepository _repository;
        public PeriodicMagazineService(IPeriodicMagazineRepository repository, IUnitOfWork unitOfWork)
            : base(repository, unitOfWork)
        {
            _repository = repository;
        }

        public PeriodicMagazine GetByTitle(string title)
        {
            return _repository.GetByTitle(title);
        }
    }
}
