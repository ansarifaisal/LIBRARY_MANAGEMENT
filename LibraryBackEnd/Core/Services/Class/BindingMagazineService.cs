using LibraryBackEnd.Core.IRepositories;
using LibraryBackEnd.Core.Models;
using LibraryBackEnd.Core.Services.Interface;

namespace LibraryBackEnd.Core.Services.Class
{
    public class BindingMagazineService : EntityService<BindingMagazine>, IBindingMagazineService
    {
        private IBindingMagazineRepository _bindingMagazineRepository;
        private IUnitOfWork _unitOfWork;

        public BindingMagazineService(IBindingMagazineRepository repository, IUnitOfWork unitOfWork)
            : base(repository, unitOfWork)
        {
            _bindingMagazineRepository = repository;
            _unitOfWork = unitOfWork;
        }

        public BindingMagazine GetByName(string title)
        {
            return _bindingMagazineRepository.GetByName(title);
        }

        public BindingMagazine GetByNumber(string number)
        {
            return _bindingMagazineRepository.GetByNumber(number);
        }
    }
}
