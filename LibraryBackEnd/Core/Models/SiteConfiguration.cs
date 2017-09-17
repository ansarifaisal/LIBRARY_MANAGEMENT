namespace LibraryBackEnd.Core.Models
{
    public class SiteConfiguration
    {
        public int Id { get; set; }

        public string Email { get; set; }

        public string Password { get; set; }

        public int Fine { get; set; }

        public int IssueDays { get; set; }

        public int NoOfBookIssue { get; set; }

        public string AdminName { get; set; }

        public string CanLogin { get; set; }

        public string CanRegister { get; set; }

        public string NotificationSent { get; set; }
    }
}
