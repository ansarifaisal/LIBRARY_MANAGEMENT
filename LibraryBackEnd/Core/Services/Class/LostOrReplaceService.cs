using LibraryBackEnd.Core.IRepositories;
using LibraryBackEnd.Core.Models;
using LibraryBackEnd.Core.Services.Interface;

namespace LibraryBackEnd.Core.Services.Class
{
    public class LostOrReplaceService : EntityService<LostOrReplace>, ILostOrReplaceService
    {
        private ILostOrReplaceRepository _repository;
        private IUnitOfWork _unitOfWork;
        public LostOrReplaceService(ILostOrReplaceRepository repository, IUnitOfWork unitOfWork)
            : base(repository, unitOfWork)
        {
            _repository = repository;
            _unitOfWork = unitOfWork;
        }
    }
}
