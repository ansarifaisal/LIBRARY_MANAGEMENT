using LibraryBackEnd.Core.IRepositories;
using LibraryBackEnd.Core.Models;
using LibraryBackEnd.Core.Services.Interface;
using System;

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

        public Subject GetByName(string name)
        {
            if (name == null)
                throw new ArgumentNullException();

            return _subjectRepository.GetByName(name);
        }
    }
}
