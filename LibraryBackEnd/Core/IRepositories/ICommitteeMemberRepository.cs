using LibraryBackEnd.Core.Models;

namespace LibraryBackEnd.Core.IRepositories
{
    public interface ICommitteeMemberRepository : IGenericRepository<CommitteeMember>
    {
        CommitteeMember GetByName(string name);
    }
}
