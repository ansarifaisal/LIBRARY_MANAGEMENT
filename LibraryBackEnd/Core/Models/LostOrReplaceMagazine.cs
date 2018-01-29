using System;

namespace LibraryBackEnd.Core.Models
{
    public class LostOrReplaceMagazine
    {

        public int Id { get; set; }

        public string Title { get; set; }

        public string Number { get; set; }

        public int Volume { get; set; }

        public DateTime IssuedDate { get; set; }

        public DateTime ReturnDate { get; set; }

        public string ReceivedBy { get; set; }

        public string RollNo { get; set; }

        public string FullName { get; set; }

        public string Course { get; set; }

        public string Email { get; set; }

        public string Remark { get; set; }

        public string Status { get; set; }

    }
}
