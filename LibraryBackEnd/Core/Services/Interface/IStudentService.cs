﻿using LibraryBackEnd.Core.Models;

namespace LibraryBackEnd.Core.Services.Interface
{
    public interface IStudentService : IEntityService<ApplicationUser>
    {
        ApplicationUser GetUserById(string Id);
        ApplicationUser GetByUserName(string userName);
        ApplicationUser GetByRollNo(string rollNumber);
    }
}
