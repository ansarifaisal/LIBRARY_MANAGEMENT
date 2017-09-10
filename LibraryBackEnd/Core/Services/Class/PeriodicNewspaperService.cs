using LibraryBackEnd.Core.IRepositories;
using LibraryBackEnd.Core.Models;
using LibraryBackEnd.Core.Services.Interface;

namespace LibraryBackEnd.Core.Services.Class
{
    public class PeriodicNewspaperService : EntityService<PeriodicNewspaper>, IPeriodicNewspaperService
    {
        private IPeriodicNewspaperRepository _repository;
        private IUnitOfWork _unitOfWork;

        public PeriodicNewspaperService(IPeriodicNewspaperRepository repository, IUnitOfWork unitOfWork)
            : base(repository, unitOfWork)
        {
            _repository = repository;
            _unitOfWork = unitOfWork;
        }
    }
}
