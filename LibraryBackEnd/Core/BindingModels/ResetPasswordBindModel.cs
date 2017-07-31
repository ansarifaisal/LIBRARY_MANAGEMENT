namespace LibraryBackEnd.Core.BindingModels
{
    public class ResetPasswordBindModel
    {
        public string UserName { get; set; }

        public string Code { get; set; }

        public string Password { get; set; }

        public string ConfirmPassword { get; set; }
    }
}
