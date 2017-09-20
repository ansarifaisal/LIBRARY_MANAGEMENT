using LibraryBackEnd.Core.IRepositories;
using LibraryBackEnd.Core.Models;
using LibraryBackEnd.Core.Services.Interface;
using System.Collections.Generic;

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

        public IEnumerable<PeriodicMagazine> GetMagazineByCourse(string course)
        {
            return _repository.GetMagazineByCourse(course);
        }

        public IEnumerable<PeriodicMagazine> GetMagazineByPeriodicity(string periodicity)
        {
            return _repository.GetMagazineByPeriodicity(periodicity);
        }

        public IEnumerable<PeriodicMagazine> GetMagazineBySubscription(int year)
        {
            return _repository.GetMagazineBySubscription(year);
        }

        public IEnumerable<PeriodicMagazine> GetMagazineByTitle(string title)
        {
            return _repository.GetMagazineByTitle(title);
        }

        public IEnumerable<PeriodicMagazine> GetMagazineByTypes(string type)
        {
            return _repository.GetMagazineByTypes(type);
        }

        public object GetMagazineCourse()
        {
            return _repository.GetMagazineCourse();
        }

        public object GetMagazinePeriodicity()
        {
            return _repository.GetMagazinePeriodicity();
        }

        public object GetMagazineSubscriptionInYear()
        {
            return _repository.GetMagazineSubscriptionInYear();
        }

        public object GetMagazineTitles()
        {
            return _repository.GetMagazineTitles();
        }

        public object GetMagazineTypes()
        {
            return _repository.GetMagazineTypes();
        }
    }
}
