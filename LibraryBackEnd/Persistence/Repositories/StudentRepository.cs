﻿using LibraryBackEnd.Configuration;
using LibraryBackEnd.Core.IRepositories;
using LibraryBackEnd.Core.Models;
using System.Linq;

namespace LibraryBackEnd.Persistence.Repositories
{

    public class StudentRepository : GenericRepository<ApplicationUser>, IStudentRepository
    {

        private readonly ApplicationDbContext _context;

        public StudentRepository(ApplicationDbContext context) : base(context)
        {
            _context = context;
        }

        public ApplicationUser GetByUserName(string userName)
        {
            return _context.Users.Where(u => u.UserName == userName).SingleOrDefault();
        }

        public ApplicationUser GetUserById(string Id)
        {
            return _context.Users.Find(Id);
        }
    }
}