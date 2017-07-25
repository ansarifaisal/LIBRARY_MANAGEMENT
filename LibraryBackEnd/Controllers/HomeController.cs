using LibraryBackEnd.Models;
using System.Linq;
using System.Web.Http;

namespace LibraryBackEnd.Controllers
{

    [RoutePrefix("api/home")]
    public class HomeController : ApiController
    {
        [Route("test")]
        [HttpGet]
        public IHttpActionResult test()
        {
            return Ok("Called");
        }

        private ApplicationDbContext _context;

        public HomeController()
        {
            _context = new ApplicationDbContext();
        }

        // GET /api/Home/UserByUserName
        [Route("UserByUserName")]
        [HttpGet]
        public IHttpActionResult GetUserByUserName(string userName)
        {
            var user = _context.Users.Where(u => u.UserName == userName).SingleOrDefault();

            return Ok(user);
        }

    }
}
