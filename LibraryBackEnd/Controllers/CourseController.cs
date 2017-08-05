using LibraryBackEnd.Core.Models;
using LibraryBackEnd.Core.Services.Interface;
using System.Web.Http;

namespace LibraryBackEnd.Controllers
{
    [Authorize]
    [RoutePrefix("api/course")]
    public class CourseController : ApiController
    {
        private ICourseService _courseService;

        public CourseController(ICourseService courseService)
        {
            _courseService = courseService;
        }

        [Route("add")]
        [HttpPost]
        public IHttpActionResult add(Course course)
        {
            if (!ModelState.IsValid)
                return BadRequest("Model is invalid");
            _courseService.Create(course);
            return Ok("Added Successfully!");
        }

        [Route("all")]
        [HttpGet]
        public IHttpActionResult GetAll()
        {
            var courses = _courseService.GetAll();
            return Ok(courses);
        }

        [Route("edit")]
        [HttpPost]
        public IHttpActionResult Edit(Course course)
        {
            if (!ModelState.IsValid)
                return BadRequest("Model is Invalid");
            _courseService.Update(course);
            return Ok("Updated Successfully!");
        }

        [HttpPost]
        [Route("delete")]
        public IHttpActionResult Delete(Course course)
        {
            if (!ModelState.IsValid)
                return BadRequest("Model is Invalid");
            _courseService.Delete(course);
            return Ok("Deleted Successfully!");
        }

        public bool CheckExisting(string name)
        {
            if (name == null)
                throw new HttpArgumentNullException();
            var course = _courseService.GetByName(name);
            if (course == null)
                return false;
            return true;
        }

        [HttpGet]
        [Route("get/{Id}")]
        public IHttpActionResult Get(int Id)
        {
            if (Id == 0)
                throw new HttpArgumentNullException();
            var course = _courseService.SelectById(Id);
            if (course == null)
                return BadRequest();

            return Ok(course);
        }

    }
}
