﻿using LibraryBackEnd.Configuration;
using LibraryBackEnd.Core.IRepositories;
using LibraryBackEnd.Core.Models;
using System;
using System.Linq;

namespace LibraryBackEnd.Persistence.Repositories
{
    public class SubjectRepository : GenericRepository<Subject>, ISubjectRepository
    {
        private ApplicationDbContext _context;

        public SubjectRepository(ApplicationDbContext context)
            : base(context)
        {
            _context = context;
        }

        public Subject GetByName(string name)
        {
            if (name == null)
                throw new ArgumentNullException();

            return _context.Subjects.Where(s => s.Name == name).SingleOrDefault();
        }
    }
}