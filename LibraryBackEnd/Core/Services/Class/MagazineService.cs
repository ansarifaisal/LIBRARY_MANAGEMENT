using LibraryBackEnd.Core.IRepositories;
using LibraryBackEnd.Core.Models;
using LibraryBackEnd.Core.Services.Interface;
using System.Collections.Generic;

namespace LibraryBackEnd.Core.Services.Class
{
    public class MagazineService : EntityService<Magazine>, IMagazineService
    {
        private IMagazineRepository _repository;
        private IUnitOfWork _unitOfWork;
        public MagazineService(IMagazineRepository repository, IUnitOfWork unitOfWork)
            : base(repository, unitOfWork)
        {
            _repository = repository;
            _unitOfWork = unitOfWork;
        }

        public Magazine GetByNumber(string number)
        {
            return _repository.GetByNumber(number);
        }

        public IEnumerable<Magazine> GetMagazines(string title)
        {
            return _repository.GetMagazines(title);
        }
    }
}
