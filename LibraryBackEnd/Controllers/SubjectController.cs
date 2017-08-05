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

    }
}
