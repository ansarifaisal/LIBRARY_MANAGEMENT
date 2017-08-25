using System;

namespace LibraryBackEnd.Core.Models
{
    public class PeriodicMagazine
    {
        public int Id { get; set; }

        public string Title { get; set; }

        public string Periodicity { get; set; }

        public string Publisher { get; set; }

        public string Subscription { get; set; }

        public DateTime From { get; set; }

        public DateTime To { get; set; }

        public int Volume { get; set; }

        public string Source { get; set; }

        public string OrderNo { get; set; }

        public DateTime OrderDate { get; set; }

        public string BillNo { get; set; }

        public DateTime BillDate { get; set; }

        public double Amount { get; set; }

        public string PaidBy { get; set; }

        public string ChequeNo { get; set; }
    }
}
