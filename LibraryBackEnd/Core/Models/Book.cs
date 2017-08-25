using System;
using System.ComponentModel.DataAnnotations;

namespace LibraryBackEnd.Core.Models
{
    public class Book
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
        public string Author { get; set; }

        [Required]
        public string Publisher { get; set; }

        [Required]
        public string PlaceOfPublication { get; set; }

        [Required]
        public DateTime DateOfPublication { get; set; }

        [Required]
        public string Course { get; set; }

        [Required]
        public int Semester { get; set; }

        [Required]
        public string Subject { get; set; }

        [Required]
        public string TypeOfBook { get; set; }

        [Required]
        public string Source { get; set; }

        [Required]
        public string Edition { get; set; }

        [Required]
        public string ClassNo { get; set; }

        public string Get { get; set; }

        public double ActualPrice { get; set; }

        public double Discount { get; set; }

        public double DiscountPrice { get; set; }

        public string BillNo { get; set; }

        public DateTime BillDate { get; set; }

        [Required]
        public string Status { get; set; }

        public Book()
        {
            Date = DateTime.Now;
            ClassNo = "NA";
        }
    }
}
