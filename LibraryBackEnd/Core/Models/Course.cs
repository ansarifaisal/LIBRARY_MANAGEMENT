using System.ComponentModel.DataAnnotations;

namespace LibraryBackEnd.Core.Models
{
    public class Course
    {
        [Required]
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public int NoOfBooks { get; set; }

        [Required]
        public int NoOfSemester { get; set; }

        [Required]
        public int NoOfStudent { get; set; }

        public Course()
        {
            NoOfBooks = 0;
            NoOfSemester = 0;
            NoOfStudent = 0;
        }
    }
}
