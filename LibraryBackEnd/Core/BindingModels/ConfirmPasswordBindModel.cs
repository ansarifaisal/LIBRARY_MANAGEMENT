namespace LibraryBackEnd.Core.BindModels
{
    public class ConfirmPasswordBindModel
    {

        public string UserId { get; set; }

        public string UserName { get; set; }

        public string Code { get; set; }

        public string Password { get; set; }
    }
}
