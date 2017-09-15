using LibraryBackEnd.Core.Models;

namespace LibraryBackEnd.Core.IRepositories
{
    public interface IPeriodicNewspaperRepository : IGenericRepository<PeriodicNewspaper>
    {
        PeriodicNewspaper GetByName(string name);
    }
}
