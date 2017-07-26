using System.ComponentModel.DataAnnotations;

namespace LibraryBackEnd.Core.BindingModels
{
    public class AddExternalLoginBindingModel
    {
        [Required]
        [Display(Name = "External access token")]
        public string ExternalAccessToken { get; set; }
    }
}
