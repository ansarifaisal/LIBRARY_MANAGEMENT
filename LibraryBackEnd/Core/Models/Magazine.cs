using System;

namespace LibraryBackEnd.Core.Models
{
    public class Magazine
    {
        public int Id { get; set; }

        public string Title { get; set; }

        public DateTime Date { get; set; }

        public DateTime Month { get; set; }

        public int Volume { get; set; }

        public int Number { get; set; }

        public string DateOfRecieved { get; set; }

        public string RecievedBy { get; set; }

        public string Remark { get; set; }
    }
}
