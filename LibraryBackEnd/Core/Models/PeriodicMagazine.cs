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

        public DateTime SubscriptionDate { get; set; }

        public string SubscriptionAmount { get; set; }

        public string SubscriptionDuration { get; set; }

        public DateTime From { get; set; }

        public DateTime To { get; set; }

        public int Volume { get; set; }

        public string Type { get; set; }

        public string Course { get; set; }

        public string Source { get; set; }

        public string OrderNo { get; set; }

        public DateTime OrderDate { get; set; }

        public string BillNo { get; set; }

        public string BillDate { get; set; }

        public double Amount { get; set; }

        public string PaidBy { get; set; }

        public string ChequeNo { get; set; }

        public string ChequeDate { get; set; }

        public string BundleSentDate { get; set; }

        public string BundleDeliveryDate { get; set; }
    }
}
