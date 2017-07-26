namespace LibraryBackEnd.Core
{
    public interface IUnitOfWork
    {
        void Complete();
    }
}