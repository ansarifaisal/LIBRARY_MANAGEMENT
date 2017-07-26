using LibraryBackEnd.Configuration;
using LibraryBackEnd.Core.IRepositories;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Linq.Expressions;

namespace LibraryBackEnd.Persistence.Repositories
{
    public abstract class GenericRepository<T> : IGenericRepository<T> where T : class
    {
        // setting up the database context
        private readonly ApplicationDbContext _context;

        //setting up generic entity object
        private readonly IDbSet<T> _entity;

        //Creating Constructor
        public GenericRepository(ApplicationDbContext context)
        {
            _context = context;
            _entity = context.Set<T>();
        }

        // Get method to get all data
        public virtual IEnumerable<T> GetAll()
        {
            return _entity.ToList();
        }

        //Get results by condition
        public virtual IEnumerable<T> FindBy(Expression<Func<T, bool>> predicate)
        {
            IEnumerable<T> query = _entity.Where(predicate).AsEnumerable();
            return query;
        }

        // Get a perticular data
        public virtual T SelectById(object id)
        {
            return _entity.Find(id);
        }

        // insert object
        public virtual void Insert(T obj)
        {
            _entity.Add(obj);
        }

        //update object
        public virtual void Update(T obj)
        {
            _context.Entry(obj).State = EntityState.Modified;
        }

        //delete object
        public virtual void Delete(T obj)
        {
            _entity.Remove(obj);
        }

        public void Complete()
        {
            _context.SaveChanges();
        }
    }
}
