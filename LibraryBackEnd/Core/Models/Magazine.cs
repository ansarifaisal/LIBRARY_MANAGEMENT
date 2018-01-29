using System;

namespace LibraryBackEnd.Core.Models
{
    public class Magazine
    {
        public int Id { get; set; }

        public string PeriodicTitle { get; set; }

        public int PeriodicId { get; set; }

        public string Publisher { get; set; }

        public DateTime Date { get; set; }

        public DateTime Month { get; set; }

        public int Volume { get; set; }

        public string Number { get; set; }

        public string LibRef { get; set; }

        public string Issn { get; set; }

        public DateTime DateOfRecieved { get; set; }

        public string RecievedBy { get; set; }

        public string Status { get; set; }

    }
}
