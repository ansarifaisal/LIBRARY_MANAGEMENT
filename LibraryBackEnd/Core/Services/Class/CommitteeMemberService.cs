using LibraryBackEnd.Core.IRepositories;
using LibraryBackEnd.Core.Models;
using LibraryBackEnd.Core.Services.Interface;

namespace LibraryBackEnd.Core.Services.Class
{
    public class CommitteeMemberService : EntityService<CommitteeMember>, ICommitteeMemberService
    {
        private ICommitteeMemberRepository _repository;
        private IUnitOfWork _unitOfWork;
        public CommitteeMemberService(ICommitteeMemberRepository repository, IUnitOfWork unitOfWork) : base(repository, unitOfWork)
        {
            _repository = repository;
            _unitOfWork = unitOfWork;
        }

        public CommitteeMember GetByName(string name)
        {
            return _repository.GetByName(name);
        }
    }
}
