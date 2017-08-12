using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using System.ComponentModel.DataAnnotations;
using System.Security.Claims;
using System.Threading.Tasks;

namespace LibraryBackEnd.Core.Models
{
    // You can add profile data for the user by adding more properties to your ApplicationUser class, please visit http://go.microsoft.com/fwlink/?LinkID=317594 to learn more.
    public class ApplicationUser : IdentityUser
    {
        public string FullName { get; set; }

        public string RollNo { get; set; }

        public int YearOfAdmission { get; set; }

        public string Course { get; set; }

        public int IssueCount { get; set; }

        public int Fine { get; set; }

        [Required]
        public string Role { get; set; }

        [Required]
        public string Status { get; set; }

        public bool Modified { get; set; }

        public ApplicationUser()
        {
            FullName = "NA";
            RollNo = "NA";
            YearOfAdmission = 0;
            Course = "NA";
            IssueCount = 0;
            Fine = 0;
            Modified = false;
            Status = "PENDING";
            Role = "STUDENT";
        }

        public async Task<ClaimsIdentity> GenerateUserIdentityAsync(UserManager<ApplicationUser> manager, string authenticationType)
        {
            // Note the authenticationType must match the one defined in CookieAuthenticationOptions.AuthenticationType
            var userIdentity = await manager.CreateIdentityAsync(this, authenticationType);
            // Add custom user claims here
            return userIdentity;
        }
    }
}