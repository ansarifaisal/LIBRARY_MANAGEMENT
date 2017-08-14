﻿using LibraryBackEnd.Core.Models;
using System.Collections.Generic;

namespace LibraryBackEnd.Core.Services.Interface
{
    public interface IStudentService : IEntityService<ApplicationUser>
    {
        ApplicationUser GetUserById(string Id);
        ApplicationUser GetByUserName(string userName);
        ApplicationUser GetByRollNo(string rollNumber);
        IEnumerable<ApplicationUser> GetUsersByRole(string role);
    }
}
