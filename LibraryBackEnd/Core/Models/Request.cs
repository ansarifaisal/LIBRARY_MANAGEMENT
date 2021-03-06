﻿using System;

namespace LibraryBackEnd.Core.Models
{
    public class Request
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Author { get; set; }
        public string Publication { get; set; }
        public string BookCourse { get; set; }
        public string Type { get; set; }
        public string Subject { get; set; }
        public int Semester { get; set; }
        public string RollNo { get; set; }
        public string Name { get; set; }
        public string StudentCourse { get; set; }
        public string Email { get; set; }
        public string Status { get; set; }
        public DateTime Date { get; set; }
        public string Remark { get; set; }
        public Request()
        {
            Date = DateTime.Now;
            Status = "PENDING";
        }
    }
}
