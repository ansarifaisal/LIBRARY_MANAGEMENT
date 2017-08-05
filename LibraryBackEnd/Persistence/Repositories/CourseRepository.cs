using LibraryBackEnd.Configuration;
using LibraryBackEnd.Core.IRepositories;
using LibraryBackEnd.Core.Models;
using System;
using System.Linq;

namespace LibraryBackEnd.Persistence.Repositories
{
    public class CourseRepository : GenericRepository<Course>, ICourseRepository
    {

        ApplicationDbContext _context;

        public CourseRepository(ApplicationDbContext context) :
            base(context)
        {
            _context = context;
        }

        public Course GetByName(string name)
        {
            if (name == null)
                throw new ArgumentNullException();

            return _context.Courses.Where(c => c.Name == name).SingleOrDefault();
        }
    }
}
