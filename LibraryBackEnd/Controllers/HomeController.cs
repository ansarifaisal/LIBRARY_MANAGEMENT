using LibraryBackEnd.Core.Models;
using LibraryBackEnd.Core.Services.Interface;
using System.Web.Http;

namespace LibraryBackEnd.Controllers
{

    [RoutePrefix("api/home")]
    public class HomeController : ApiController
    {
        private readonly IStudentService _studentService;
        private ISendEmailService _emailService;

        public HomeController(IStudentService studentService, ISendEmailService sendEmailService)
        {
            _studentService = studentService;
            _emailService = sendEmailService;
        }

        // GET /api/Home/UserByUserName
        [Route("UserByUserName")]
        [HttpGet]
        [Authorize]
        public IHttpActionResult GetUserByUserName(string userName)
        {
            var user = _studentService.GetByUserName(userName);

            if (user == null)
                return NotFound();

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

        //Get /api/Home/checkExistingUser 
        //to check whether the user exists
        [Route("checkExistingUser")]
        [HttpGet]
        public bool CheckExistingUser(string userName = "")
        {
            var flag = false;
            var user = _studentService.GetByUserName(userName);

            if (user != null)
                return flag = true;

            return flag;
        }

    }
}
