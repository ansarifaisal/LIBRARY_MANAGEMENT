using LibraryBackEnd.Core.IRepositories;
using LibraryBackEnd.Core.Services.Interface;
using System;
using System.Collections.Generic;

namespace LibraryBackEnd.Core.Services.Class
{
    public abstract class EntityService<T> : IEntityService<T> where T : class
    {
        IGenericRepository<T> _repository;
        IUnitOfWork _unitOfWork;

        public EntityService(IGenericRepository<T> repository, IUnitOfWork unitOfWork)
        {
            _repository = repository;
            _unitOfWork = unitOfWork;
        }

        public virtual void Create(T entity)
        {
            if (entity == null)
                throw new ArgumentNullException("Entity Not Found");
            _repository.Insert(entity);
            _repository.Complete();
        }

        public void Delete(T entity)
        {
            if (entity == null)
                throw new ArgumentNullException("Entity Not Found");
            _repository.Delete(entity);
            _unitOfWork.Complete();
        }

        public IEnumerable<T> GetAll()
        {
            return _repository.GetAll();
        }

        public void Update(T entity)
        {
            if (entity == null)
                throw new ArgumentNullException("Entity Not Found");
            _repository.Update(entity);
            _unitOfWork.Complete();
        }

        public T SelectById(object Id)
        {
            if (Id == null)
                throw new ArgumentNullException("Id Not Found");
            return _repository.SelectById(Id);
        }
    }
}
