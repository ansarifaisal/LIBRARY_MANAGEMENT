using LibraryBackEnd.Core.IRepositories;
using LibraryBackEnd.Core.Models;
using LibraryBackEnd.Core.Services.Interface;
using System;
using System.Collections.Generic;

namespace LibraryBackEnd.Core.Services.Class
{
    public class NewspaperService : EntityService<Newspaper>, INewspaperService
    {
        private INewspaperRepository _repository;
        private IUnitOfWork _unitOfWork;
        public NewspaperService(INewspaperRepository repository, IUnitOfWork unitOfWork)
            : base(repository, unitOfWork)
        {
            _repository = repository;
            _unitOfWork = unitOfWork;
        }

        public IEnumerable<Newspaper> GetByMonth(string title, DateTime month)
        {
            return _repository.GetByMonth(title, month);
        }

        public Newspaper GetDate(DateTime date, DateTime month, string publisher)
        {
            return _repository.GetDate(date, month, publisher);
        }
    }
}
