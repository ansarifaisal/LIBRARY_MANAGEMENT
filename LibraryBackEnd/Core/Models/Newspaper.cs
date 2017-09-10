using System;

namespace LibraryBackEnd.Core.Models
{
    public class Newspaper
    {
        public int Id { get; set; }

        public string Title { get; set; }

        public DateTime Month { get; set; }

        public string Publisher { get; set; }

        public DateTime Date { get; set; }

        public double Price { get; set; }

        public string Librarian { get; set; }

        public string Remark { get; set; }
    }
}
