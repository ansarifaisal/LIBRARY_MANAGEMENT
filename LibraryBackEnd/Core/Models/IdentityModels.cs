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
        [Required]
        public string FullName { get; set; }

        [Required]
        public string RollNo { get; set; }

        [Required]
        public int YearOfAdmission { get; set; }

        [Required]
        public string Course { get; set; }

        [Required]
        public int IssueCount { get; set; }

        [Required]
        public int Fine { get; set; }

        [Required]
        public string Role { get; set; }

        [Required]
        public string Status { get; set; }

        [Required]
        public bool Modified { get; set; }

        public ApplicationUser()
        {
            YearOfAdmission = 0;
            Course = "NA";
            IssueCount = 0;
            Fine = 0;
            Modified = false;
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