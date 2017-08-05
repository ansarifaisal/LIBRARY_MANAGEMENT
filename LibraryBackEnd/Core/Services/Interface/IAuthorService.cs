﻿using LibraryBackEnd.Core.Models;

namespace LibraryBackEnd.Core.Services.Interface
{
    public interface IAuthorService : IEntityService<Author>
    {
        Author GetByName(string name);
    }
}