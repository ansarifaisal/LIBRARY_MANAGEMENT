using System.Collections.Generic;

namespace LibraryBackEnd.Core.Services.Interface
{
    public interface IEntityService<T> where T : class
    {
        void Create(T entity);
        void Delete(T entity);
        IEnumerable<T> GetAll();
        void Update(T entity);
        T SelectById(object Id);
    }
}
