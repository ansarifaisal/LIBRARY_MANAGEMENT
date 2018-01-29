using LibraryBackEnd.Core.Services.Class;
using System.Web.Http;

namespace LibraryBackEnd.Controllers
{
    [Authorize]
    [RoutePrefix("api/magazine/return")]
    public class ReturnMagazineController : ApiController
    {
        private ReturnMagazineService _returnMagazineService;

        public ReturnMagazineController(ReturnMagazineService returnMagazineService)
        {
            _returnMagazineService = returnMagazineService;
        }


        [Route("all")]
        [HttpGet]
        public IHttpActionResult GetAll()
        {
            var returnMagazines = _returnMagazineService.GetAll();
            return Ok(returnMagazines);
        }

        [Route("byRollNo")]
        [HttpGet]
        public IHttpActionResult GetMagazineByRollNumber(string rollNo)
        {
            var returnMagazines = _returnMagazineService.GetMagazineByRollNumber(rollNo);
            return Ok(returnMagazines);
        }

        [HttpGet]
        [Route("returnedMagazineInYears")]
        public IHttpActionResult returnedMagazineInYear()
        {
            var returnMagazine = _returnMagazineService.returnedMagazineInYear();
            return Ok(returnMagazine);
        }


        [HttpGet]
        [Route("returnedMagazineInYear/{year}")]
        public IHttpActionResult GetMagazineInYear(int year)
        {
            var returnMagazine = _returnMagazineService.GetMagazineInYear(year);
            return Ok(returnMagazine);
        }

    }
}
