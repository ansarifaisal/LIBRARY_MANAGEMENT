using LibraryBackEnd.Configuration;
using LibraryBackEnd.Core.Models;
using LibraryBackEnd.Core.Services.Interface;
using System.Linq;
using System.Web.Http;

namespace LibraryBackEnd.Controllers
{

    [RoutePrefix("api/home")]
    public class HomeController : ApiController
    {
        private readonly IStudentService _studentService;

        private ApplicationDbContext _context = new ApplicationDbContext();

        public HomeController(IStudentService studentService)
        {
            _studentService = studentService;
        }

        // GET /api/Home/UserByUserName
        [Route("UserByUserName")]
        [HttpGet]
        [Authorize]
        public IHttpActionResult GetUserByUserName(string userName)
        {
            var user = _context.Users.Where(u => u.UserName == userName).SingleOrDefault();

            return Ok(user);
        }

        // Delete /api/Home/DeleteUser

        [Route("DeleteUser")]
        [HttpGet]
        public IHttpActionResult DeleteUser(string Id = "")
        {
            ApplicationUser user = _studentService.GetUserById(Id);

            //_unitOfWork.Students.Delete(user);

            return Ok(user);
        }

        [Route("checkExistingUser")]
        [HttpGet]
        public bool checkExistingUser(string userName = "")
        {
            var flag = false;
            var user = _studentService.GetByUserName(userName);

            if (user != null)
                return flag = true;

            return flag;
        }

    }
}
