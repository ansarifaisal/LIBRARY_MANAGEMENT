using LibraryBackEnd.Core.BindingModels;
using LibraryBackEnd.Core.IRepositories;
using LibraryBackEnd.Core.Models;
using LibraryBackEnd.Core.Services.Interface;
using System.Collections.Generic;

namespace LibraryBackEnd.Core.Services.Class
{
    public class BookService : EntityService<Book>, IBookService
    {
        private IBookRepository _bookRepository;
        private IUnitOfWork _unitOfWork;

        public BookService(IBookRepository repository, IUnitOfWork unitOfWork)
            : base(repository, unitOfWork)
        {
            _bookRepository = repository;
            _unitOfWork = unitOfWork;
        }

        public IEnumerable<string> BookTitle()
        {
            return _bookRepository.BookTitle();
        }

        public Book GetByAccessionNumber(string accessionNumber)
        {
            return _bookRepository.GetByAccessionNumber(accessionNumber);
        }

        public object GetBooksInCourse()
        {
            return _bookRepository.GetBooksInCourse();
        }

        public object GetBooksInSubject()
        {
            return _bookRepository.GetBooksInSubject();
        }

        public object BookBaughtInYear()
        {
            return _bookRepository.BookBaughtInYear();
        }

        public object GetBooksTitles()
        {
            return _bookRepository.GetBooksTitles();
        }

        public IEnumerable<Book> GetBooksByCourse(string courseName)
        {
            return _bookRepository.GetBooksByCourse(courseName);
        }

        public IEnumerable<Book> GetBooksBySubject(string subject)
        {
            return _bookRepository.GetBooksBySubject(subject);
        }

        public IEnumerable<Book> GetBooksByYear(int year)
        {
            return _bookRepository.GetBooksByYear(year);
        }

        public IEnumerable<Book> GetBooksByTitle(string title)
        {
            return _bookRepository.GetBooksByTitle(title);
        }

        public IEnumerable<Book> GetSearchResults(SearchBindingModel searchBindingModel)
        {
            return _bookRepository.GetSearchResults(searchBindingModel);
        }

        public IEnumerable<string> GetAccessionNumbers()
        {
            return _bookRepository.GetAccessionNumbers();
        }

        public object GetDistinctBooksByCourse(string course)
        {
            return _bookRepository.GetDistinctBooksByCourse(course);
        }
    }
}
