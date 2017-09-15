using LibraryBackEnd.Core.Models;
using LibraryBackEnd.Core.Services.Class;
using System;
using System.Web.Http;

namespace LibraryBackEnd.Controllers
{
    [Authorize]
    [RoutePrefix("api/student")]
    public class StudentController : ApiController
    {
        private StudentService _studentService;

        public StudentController(StudentService studentService)
        {
            _studentService = studentService;
        }

        [Route("students")]
        [HttpGet]
        public IHttpActionResult GetStudents()
        {
            var students = _studentService.GetUsersByRole("STUDENT");
            return Ok(students);
        }

        [Route("faculties")]
        [HttpGet]
        public IHttpActionResult GetFactulties()
        {
            var faculties = _studentService.GetUsersByRole("FACULTY");
            return Ok(faculties);
        }

        [Route("librarians")]
        [HttpGet]
        public IHttpActionResult GetLibrarians()
        {
            var librarians = _studentService.GetUsersByRole("LIBRARIAN");
            return Ok(librarians);
        }

        [Route("edit")]
        [HttpPost]
        public IHttpActionResult Edit(ApplicationUser student)
        {
            if (!ModelState.IsValid)
                return BadRequest("Model is Invalid");
            _studentService.Update(student);
            return Ok("Updated Successfully!");
        }

        [HttpPost]
        [Route("delete")]
        public IHttpActionResult Delete(ApplicationUser student)
        {
            if (!ModelState.IsValid)
                return BadRequest("Model is Invalid");
            _studentService.Delete(student);
            return Ok("Deleted Successfully!");
        }

        [HttpGet]
        [Route("get/{Id}")]
        public IHttpActionResult Get(int Id)
        {
            if (Id == 0)
                throw new ArgumentNullException();
            var student = _studentService.SelectById(Id);
            if (student == null)
                return BadRequest();

            return Ok(student);
        }

        [HttpGet]
        [Route("byRollNo")]
        public IHttpActionResult GetByRollNo(string rollNumber)
        {
            if (rollNumber == null)
                throw new ArgumentNullException();
            var student = _studentService.GetByRollNo(rollNumber);
            if (student == null)
                return Ok(student);
            return Ok(student);
        }

        [HttpGet]
        [Route("rollNos")]
        public IHttpActionResult GetByRollNos()
        {
            var rollNos = _studentService.GetRollNos();
            return Ok(rollNos);
        }
    }
}
