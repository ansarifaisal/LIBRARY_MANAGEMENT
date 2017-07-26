using System;
using System.Collections.Generic;
using System.Linq.Expressions;

namespace LibraryBackEnd.Core.IRepositories
{
    public interface IGenericRepository<T> where T : class
    {
        IEnumerable<T> GetAll();
        IEnumerable<T> FindBy(Expression<Func<T, bool>> predicate);
        T SelectById(object id);
        void Insert(T obj);
        void Update(T obj);
        void Delete(T obj);
        void Complete();
    }
}