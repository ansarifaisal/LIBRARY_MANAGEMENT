using LibraryBackEnd.Core.IRepositories;
using LibraryBackEnd.Core.Models;
using LibraryBackEnd.Core.Services.Interface;
using System;

namespace LibraryBackEnd.Core.Services.Class
{
    public class CourseService : EntityService<Course>, ICourseService
    {
        private ICourseRepository _courseRepository;
        private IUnitOfWork _unitOfWork;

        public CourseService(ICourseRepository repository, IUnitOfWork unitOfWork)
            : base(repository, unitOfWork)
        {
            _courseRepository = repository;
            _unitOfWork = unitOfWork;
        }

        public Course GetByName(string name)
        {
            if (name == null)
                throw new ArgumentNullException();
            return _courseRepository.GetByName(name);
        }

    }
}
