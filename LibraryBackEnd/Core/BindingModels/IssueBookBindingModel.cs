using LibraryBackEnd.Core.Models;

namespace LibraryBackEnd.Core.BindingModels
{
    public class IssueBookBindingModel
    {
        public IssueBook IssueBook { get; set; }

        public Book Book { get; set; }

        public ApplicationUser User { get; set; }
    }
}
