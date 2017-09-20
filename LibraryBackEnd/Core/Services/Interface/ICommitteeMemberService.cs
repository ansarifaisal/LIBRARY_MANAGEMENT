using LibraryBackEnd.Core.Models;

namespace LibraryBackEnd.Core.Services.Interface
{
    public interface ICommitteeMemberService : IEntityService<CommitteeMember>
    {
        CommitteeMember GetByName(string name);
    }
}
