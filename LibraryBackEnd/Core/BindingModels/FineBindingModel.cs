using LibraryBackEnd.Core.Models;

namespace LibraryBackEnd.Core.BindingModels
{
    public class FineBindingModel
    {
        public IssueBook IssuedBook { get; set; }
        public string Email { get; set; }
    }
}
