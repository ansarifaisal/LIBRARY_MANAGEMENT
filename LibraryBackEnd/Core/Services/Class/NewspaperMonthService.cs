using LibraryBackEnd.Core.IRepositories;
using LibraryBackEnd.Core.Models;
using LibraryBackEnd.Core.Services.Interface;
using System;
using System.Collections.Generic;

namespace LibraryBackEnd.Core.Services.Class
{
    public class NewspaperMonthService : EntityService<NewspaperMonth>, INewspaperMonthService
    {
        private INewspaperMonthRepository _repository;
        private IUnitOfWork _unitOfWork;
        public NewspaperMonthService(INewspaperMonthRepository repository, IUnitOfWork unitOfWork)
            : base(repository, unitOfWork)
        {
            _repository = repository;
            _unitOfWork = unitOfWork;
        }

        public NewspaperMonth GetByMonth(DateTime date)
        {
            return _repository.GetByMonth(date);
        }

        public IEnumerable<NewspaperMonth> GetByTitle(string title)
        {
            return _repository.GetByTitle(title);
        }
    }
}
