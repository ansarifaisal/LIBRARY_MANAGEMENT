using LibraryBackEnd.Configuration;
using LibraryBackEnd.Core.IRepositories;
using LibraryBackEnd.Core.Models;
using System;
using System.Collections.Generic;
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

        public Subject checkExisting(string name, string courseName, int semester)
        {
            return _context.Subjects
                .Where(s => s.Name == name && s.CourseName == courseName && s.Semester == semester)
                .SingleOrDefault();
        }

        public IEnumerable<Subject> GetByCourse(string courseName, int semester)
        {
            if (courseName == null)
                throw new ArgumentNullException();

            return _context.Subjects
                .Where(s => s.CourseName == courseName && s.Semester == semester)
                .ToList();
        }

        public Subject GetByName(string name)
        {
            if (name == null)
                throw new ArgumentNullException();

            return _context.Subjects.Where(s => s.Name == name).SingleOrDefault();
        }
    }
}
