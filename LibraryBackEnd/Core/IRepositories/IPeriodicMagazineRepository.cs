using LibraryBackEnd.Core.Models;
using System.Collections.Generic;

namespace LibraryBackEnd.Core.IRepositories
{
    public interface IPeriodicMagazineRepository : IGenericRepository<PeriodicMagazine>
    {
        PeriodicMagazine GetByTitle(string title);
        object GetMagazineTitles();
        IEnumerable<PeriodicMagazine> GetMagazineByTitle(string title);
        object GetMagazineCourse();
        IEnumerable<PeriodicMagazine> GetMagazineByCourse(string course);
        object GetMagazineTypes();
        IEnumerable<PeriodicMagazine> GetMagazineByTypes(string type);
        object GetMagazinePeriodicity();
        IEnumerable<PeriodicMagazine> GetMagazineByPeriodicity(string periodicity);
        object GetMagazineSubscriptionInYear();
        IEnumerable<PeriodicMagazine> GetMagazineBySubscription(int year);
    }
}
