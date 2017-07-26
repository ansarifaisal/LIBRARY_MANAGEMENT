using LibraryBackEnd.Configuration;

namespace LibraryBackEnd.Persistence.Repositories
{
    public class test
    {
        private UnitOfWork _unitOfWork;

        public test(ApplicationDbContext context)
        {

            _unitOfWork = new UnitOfWork(context);
        }

    }
}
