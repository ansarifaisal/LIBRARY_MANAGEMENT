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

    }
}
