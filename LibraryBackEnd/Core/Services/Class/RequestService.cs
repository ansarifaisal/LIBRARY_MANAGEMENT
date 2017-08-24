using LibraryBackEnd.Core.IRepositories;
using LibraryBackEnd.Core.Models;
using LibraryBackEnd.Core.Services.Interface;
using System.Collections.Generic;

namespace LibraryBackEnd.Core.Services.Class
{
    public class RequestService : EntityService<Request>, IRequestService
    {
        private IRequestRepository _repository;
        private IUnitOfWork _unitOfWork;
        public RequestService(IRequestRepository repository, IUnitOfWork unitOfWork)
            : base(repository, unitOfWork)
        {
            _repository = repository;
            _unitOfWork = unitOfWork;
        }

        public IEnumerable<Request> GetByRollNo(string rollNo)
        {
            return _repository.GetByRollNo(rollNo);
        }
    }
}
