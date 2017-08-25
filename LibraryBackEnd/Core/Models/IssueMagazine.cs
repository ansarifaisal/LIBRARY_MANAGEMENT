using System;

namespace LibraryBackEnd.Core.Models
{
    public class IssueMagazine
    {

        public int Id { get; set; }

        public string title { get; set; }

        public string Number { get; set; }

        public DateTime IssuedDate { get; set; }

        public DateTime ReturnDate { get; set; }

        public string FullName { get; set; }

        public string RollNo { get; set; }

        public string Email { get; set; }

        public int Fine { get; set; }

    }
}
