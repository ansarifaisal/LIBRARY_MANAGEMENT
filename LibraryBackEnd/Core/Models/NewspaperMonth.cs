using System;

namespace LibraryBackEnd.Core.Models
{
    public class NewspaperMonth
    {
        public int Id { get; set; }

        public DateTime Month { get; set; }

        public int BillNumber { get; set; }

        public double Amount { get; set; }

        public string Publisher { get; set; }

        public string Title { get; set; }

        public string Librarian { get; set; }

        public string From { get; set; }

        public string To { get; set; }

    }
}
