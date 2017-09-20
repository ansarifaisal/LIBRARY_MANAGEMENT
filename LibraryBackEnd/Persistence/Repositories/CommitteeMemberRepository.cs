using LibraryBackEnd.Configuration;
using LibraryBackEnd.Core.IRepositories;
using LibraryBackEnd.Core.Models;
using System.Linq;

namespace LibraryBackEnd.Persistence.Repositories
{
    public class CommitteeMemberRepository : GenericRepository<CommitteeMember>, ICommitteeMemberRepository
    {
        private ApplicationDbContext _context;

        public CommitteeMemberRepository(ApplicationDbContext context)
            : base(context)
        {
            _context = context;
        }

        public CommitteeMember GetByName(string name)
        {
            return _context.CommitteeMembers
                .Where(c => c.Name == name)
                .SingleOrDefault();
        }
    }
}
