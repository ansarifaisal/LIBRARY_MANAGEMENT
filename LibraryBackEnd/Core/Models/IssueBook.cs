﻿using System;
using System.ComponentModel.DataAnnotations;

namespace LibraryBackEnd.Core.Models
{
    public class IssueBook
    {
        [Required]
        public int Id { get; set; }

        [Required]
        public string BookTitle { get; set; }

        [Required]
        public string AccessionNumber { get; set; }

        [Required]
        public DateTime IssuedDate { get; set; }

        [Required]
        public DateTime ReturnDate { get; set; }

        public string IssuedBy { get; set; }

        [Required]
        public string Course { get; set; }

        [Required]
        public string FullName { get; set; }

        [Required]
        public string RollNo { get; set; }

        [Required]
        public string Email { get; set; }

        [Required]
        public int Fine { get; set; }

    }
}
