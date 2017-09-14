using LibraryBackEnd.Core.IRepositories;
using LibraryBackEnd.Core.Models;
using LibraryBackEnd.Core.Services.Interface;
using System.Collections.Generic;

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

        public IEnumerable<IssueMagazine> GetMagazinesByRollNo(string rollNo)
        {
            return _repository.GetMagazinesByRollNo(rollNo);
        }
    }
}
