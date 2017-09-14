using LibraryBackEnd.Core.IRepositories;
using LibraryBackEnd.Core.Models;
using LibraryBackEnd.Core.Services.Interface;
using System;
using System.Collections.Generic;

namespace LibraryBackEnd.Core.Services.Class
{
    public class SubjectService : EntityService<Subject>, ISubjectService
    {
        private ISubjectRepository _subjectRepository;

        private IUnitOfWork _unitOfWork;

        public SubjectService(ISubjectRepository repository, IUnitOfWork unitOfWork)
            : base(repository, unitOfWork)
        {
            _subjectRepository = repository;
            _unitOfWork = unitOfWork;
        }

        public Subject checkExisting(string name, string courseName, int semester)
        {
            return _subjectRepository.checkExisting(name, courseName, semester);
        }

        public IEnumerable<Subject> GetByCourse(string courseName, int semester)
        {
            if (courseName == null)
                throw new ArgumentException();

            return _subjectRepository.GetByCourse(courseName, semester);
        }

        public Subject GetByName(string name)
        {
            if (name == null)
                throw new ArgumentNullException();

            return _subjectRepository.GetByName(name);
        }
    }
}
