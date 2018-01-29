using LibraryBackEnd.Core.IRepositories;
using LibraryBackEnd.Core.Models;
using LibraryBackEnd.Core.Services.Interface;
using System.Collections.Generic;

namespace LibraryBackEnd.Core.Services.Class
{
    public class ReturnBookService : EntityService<ReturnBook>, IReturnBookService
    {
        private IReturnBookRepository _repository;
        public ReturnBookService(IReturnBookRepository repository, IUnitOfWork unitOfWork)
            : base(repository, unitOfWork)
        {
            _repository = repository;
        }

        public IEnumerable<ReturnBook> GetBookInYear(int year)
        {
            return _repository.GetBookInYear(year);
        }

        public IEnumerable<ReturnBook> GetByRollNo(string rollNo)
        {
            return _repository.GetByRollNo(rollNo);
        }

        public IEnumerable<ReturnBook> GetReturnBook(string accessionNumber)
        {
            return _repository.GetReturnBook(accessionNumber);
        }


        public object returnedBookInYear()
        {
            return _repository.returnedBookInYear();
        }
    }
}
