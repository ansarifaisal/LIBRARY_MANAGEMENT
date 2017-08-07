using System.ComponentModel.DataAnnotations;

namespace LibraryBackEnd.Core.Models
{
    public class Subject
    {
        [Required]
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public string CourseName { get; set; }

        [Required]
        public int Semester { get; set; }
    }
}
