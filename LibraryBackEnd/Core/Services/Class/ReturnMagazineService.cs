using LibraryBackEnd.Core.Models;
using LibraryBackEnd.Core.Services.Interface;
using LibraryBackEnd.Persistence.Repositories;
using System.Collections.Generic;

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

        public IEnumerable<ReturnMagazine> GetMagazineByRollNumber(string rollNo)
        {
            return _repository.GetMagazineByRollNumber(rollNo);
        }

        public IEnumerable<ReturnMagazine> GetMagazineInYear(int year)
        {
            return _repository.GetMagazineInYear(year);
        }

        public object returnedMagazineInYear()
        {
            return _repository.returnedMagazineInYear();
        }
    }
}
