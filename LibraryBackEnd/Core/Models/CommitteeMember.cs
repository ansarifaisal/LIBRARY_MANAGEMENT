using System;

namespace LibraryBackEnd.Core.Models
{
    public class CommitteeMember
    {
        public int Id { get; set; }

        public DateTime Date { get; set; }

        public string Name { get; set; }

        public string Designation { get; set; }

        public string CommitteeRole { get; set; }
    }
}
