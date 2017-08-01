using System.ComponentModel.DataAnnotations;

namespace LibraryBackEnd.Core.Models
{
    public class Publication
    {
        [Required]
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }
    }
}
