using System.ComponentModel.DataAnnotations;

namespace LibraryBackEnd.Core.BindingModels
{
    public class AuthorBindingModel
    {
        [Required]
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public string Publication { get; set; }


    }
}
