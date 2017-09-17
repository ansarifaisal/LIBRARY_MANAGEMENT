using LibraryBackEnd.Core.IRepositories;
using LibraryBackEnd.Core.Models;
using LibraryBackEnd.Core.Services.Interface;

namespace LibraryBackEnd.Core.Services.Class
{
    public class SiteConfigurationService : EntityService<SiteConfiguration>, ISiteConfigurationService
    {
        private ISiteConfigurationRepository _repository;
        private IUnitOfWork _unitOfWork;

        public SiteConfigurationService(ISiteConfigurationRepository repository, IUnitOfWork unitOfWork)
            : base(repository, unitOfWork)
        {
            _repository = repository;
            _unitOfWork = unitOfWork;
        }
    }
}
