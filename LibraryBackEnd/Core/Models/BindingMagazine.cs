using System;
using System.ComponentModel.DataAnnotations;

namespace LibraryBackEnd.Core.Models
{
    public class BindingMagazine
    {
        [Required]
        public int Id { get; set; }

        [Required]
        public String AccessionNumber { get; set; }

        [Required]
        public DateTime Date { get; set; }

        [Required]
        public string Title { get; set; }

        [Required]
        public string Pages { get; set; }

        [Required]
        public string Editor { get; set; }

        [Required]
        public string Publisher { get; set; }

        [Required]
        public string Issn { get; set; }

        [Required]
        public string Source { get; set; }

        [Required]
        public string ClassNo { get; set; }

        [Required]
        public string Course { get; set; }

        public BindingMagazine()
        {
            Date = DateTime.Now;
        }
    }
}
