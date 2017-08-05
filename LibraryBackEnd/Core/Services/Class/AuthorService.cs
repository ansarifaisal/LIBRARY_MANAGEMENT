﻿using LibraryBackEnd.Core.IRepositories;
using LibraryBackEnd.Core.Models;
using LibraryBackEnd.Core.Services.Interface;
using System;

namespace LibraryBackEnd.Core.Services.Class
{
    public class AuthorService : EntityService<Author>, IAuthorService
    {
        private IAuthorRepository _authorRepository;
        private IUnitOfWork _unitOfWork;

        public AuthorService(IAuthorRepository repository, IUnitOfWork unitOfWork)
            : base(repository, unitOfWork)
        {
            _authorRepository = repository;
            _unitOfWork = unitOfWork;
        }

        public Author GetByName(string name)
        {
            if (name == null)
                throw new ArgumentNullException();

            return _authorRepository.GetByName(name);
        }
    }
}
