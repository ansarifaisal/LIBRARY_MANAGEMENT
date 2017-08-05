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
        public int NoOfSemesters { get; set; }

        [Required]
        public int NoOfStudents { get; set; }

        public Course()
        {
            NoOfBooks = 0;
            NoOfSemesters = 0;
            NoOfStudents = 0;
        }
    }
}
