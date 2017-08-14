using LibraryBackEnd.Core.IRepositories;
using LibraryBackEnd.Core.Models;
using LibraryBackEnd.Core.Services.Interface;
using System.Collections.Generic;

namespace LibraryBackEnd.Core.Services.Class
{
    public class StudentService : EntityService<ApplicationUser>, IStudentService
    {
        IUnitOfWork _unitOfWork;
        IStudentRepository _repository;

        public StudentService(IStudentRepository repository, IUnitOfWork unitOfWork)
            : base(repository, unitOfWork)
        {
            _unitOfWork = unitOfWork;
            _repository = repository;
        }

        public ApplicationUser GetUserById(string Id)
        {
            return _repository.GetUserById(Id);
        }

        public ApplicationUser GetByUserName(string userName)
        {
            return _repository.GetByUserName(userName);
        }

        public ApplicationUser GetByRollNo(string rollNumber)
        {
            return _repository.GetByRollNo(rollNumber);
        }

        public IEnumerable<ApplicationUser> GetUsersByRole(string role)
        {
            return _repository.GetUsersByRole(role);
        }
    }
}
