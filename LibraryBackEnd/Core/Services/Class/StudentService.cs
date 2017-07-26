using LibraryBackEnd.Core.IRepositories;
using LibraryBackEnd.Core.Models;
using LibraryBackEnd.Core.Services.Interface;

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
    }
}
