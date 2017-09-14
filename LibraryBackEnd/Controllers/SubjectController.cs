using LibraryBackEnd.Core.Models;
using LibraryBackEnd.Core.Services.Interface;
using System;
using System.Web.Http;

namespace LibraryBackEnd.Controllers
{
    [Authorize]
    [RoutePrefix("api/subject")]
    public class SubjectController : ApiController
    {
        private ISubjectService _subjectService;

        public SubjectController(ISubjectService subjectService)
        {
            _subjectService = subjectService;
        }

        [Route("add")]
        [HttpPost]
        public IHttpActionResult add(Subject subject)
        {
            if (!ModelState.IsValid)
                return BadRequest("Model is invalid");
            var flag = check(subject.Name, subject.CourseName, subject.Semester);
            if (flag == true)
                return BadRequest("Error adding subject");
            _subjectService.Create(subject);
            return Ok("Added Successfully!");
        }

        [Route("all")]
        [HttpGet]
        public IHttpActionResult GetAll()
        {
            var courses = _subjectService.GetAll();
            return Ok(courses);
        }

        [Route("edit")]
        [HttpPost]
        public IHttpActionResult Edit(Subject subject)
        {
            if (!ModelState.IsValid)
                return BadRequest("Model is Invalid");
            var flag = check(subject.Name, subject.CourseName, subject.Semester);
            if (flag == true)
                return BadRequest("Error Editing subject");
            _subjectService.Update(subject);
            return Ok("Updated Successfully!");
        }

        [HttpPost]
        [Route("delete")]
        public IHttpActionResult Delete(Subject subject)
        {
            if (!ModelState.IsValid)
                return BadRequest("Model is Invalid");
            _subjectService.Delete(subject);
            return Ok("Deleted Successfully!");
        }

        public bool CheckExisting(string name)
        {
            if (name == null)
                throw new ArgumentNullException();
            var course = _subjectService.GetByName(name);
            if (course == null)
                return false;
            return true;
        }

        [HttpGet]
        [Route("get/{Id}")]
        public IHttpActionResult Get(int Id)
        {
            if (Id == 0)
                throw new ArgumentNullException();
            var course = _subjectService.SelectById(Id);
            if (course == null)
                return BadRequest();

            return Ok(course);
        }

        [HttpGet]
        [Route("byCourse")]
        public IHttpActionResult GetByCourse(string courseName, int semester)
        {
            if (courseName == null)
                throw new ArgumentNullException();
            var courses = _subjectService.GetByCourse(courseName, semester);
            if (courses == null)
                return BadRequest();
            return Ok(courses);
        }

        [HttpGet]
        [Route("checkExisting")]
        public IHttpActionResult checkExisting(string name, string courseName, int semester)
        {
            if (courseName == null || name == null || semester == 0)
                throw new ArgumentNullException();
            var tempName = name.Replace("  ", "++");
            var subject = _subjectService.checkExisting(tempName, courseName, semester);

            return Ok(subject);
        }

        public bool check(string name, string courseName, int semester)
        {
            if (name == "" || courseName == "" || semester == 0)
                return false;
            var tempName = name.Replace("  ", "++");
            var subject = _subjectService.checkExisting(tempName, courseName, semester);
            if (subject == null)
                return false;
            return true;
        }

    }
}
