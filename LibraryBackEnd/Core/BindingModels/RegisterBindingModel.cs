using System.ComponentModel.DataAnnotations;

namespace LibraryBackEnd.Core.BindingModels
{
    public class RegisterBindingModel
    {
        [Required]
        [Display(Name = "Email")]
        public string Email { get; set; }

        [Required]
        [StringLength(100, ErrorMessage = "The {0} must be at least {2} characters long.", MinimumLength = 6)]
        [DataType(DataType.Password)]
        [Display(Name = "Password")]
        public string Password { get; set; }

        [DataType(DataType.Password)]
        [Display(Name = "Confirm password")]
        [Compare("Password", ErrorMessage = "The password and confirmation password do not match.")]
        public string ConfirmPassword { get; set; }

        public string Role { get; set; }

        public string Status { get; set; }

        public string FullName { get; set; }

        public string RollNo { get; set; }

        public int YearOfAdmission { get; set; }

        public string Course { get; set; }

        public int IssueCount { get; set; }

        public int Fine { get; set; }

        public bool Modified { get; set; }
    }
}
