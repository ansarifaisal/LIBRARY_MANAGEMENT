using LibraryBackEnd.Core.Models;
using LibraryBackEnd.Core.Services.Interface;
using System;
using System.Web.Http;

namespace LibraryBackEnd.Controllers
{
    [Authorize]
    [RoutePrefix("api/magazine")]
    public class MagazineController : ApiController
    {
        private IMagazineService _magazineService;
        public MagazineController(IMagazineService magazineService)
        {
            _magazineService = magazineService;
        }

        [Route("add")]
        [HttpPost]
        public IHttpActionResult Add(Magazine magazine)
        {
            magazine.Date = DateTime.Now;
            if (!ModelState.IsValid)
                return BadRequest("Model is Invalid");

            _magazineService.Create(magazine);
            return Ok("Added Successfully!");
        }

        [Route("all")]
        [HttpGet]
        public IHttpActionResult All(string title)
        {
            var magazines = _magazineService.GetMagazines(title);
            return Ok(magazines);
        }

        [Route("edit")]
        [HttpPost]
        public IHttpActionResult Edit(Magazine magazine)
        {
            if (!ModelState.IsValid)
                return BadRequest("Model is Invalid");

            _magazineService.Update(magazine);
            return Ok();
        }

        [Route("delete")]
        [HttpPost]
        public IHttpActionResult Delete(Magazine magazine)
        {
            if (!ModelState.IsValid)
                return BadRequest("Model is Invalid");

            _magazineService.Delete(magazine);
            return Ok();
        }

        [Route("get/{Id}")]
        [HttpGet]
        public IHttpActionResult Get(int Id)
        {
            if (Id == 0)
                throw new ArgumentNullException();

            var magazinePublisher = _magazineService.SelectById(Id);

            if (magazinePublisher == null)
                return NotFound();

            return Ok(magazinePublisher);
        }

        [Route("getByNumber/{number}")]
        [HttpGet]
        public IHttpActionResult GetByNumber(string number)
        {
            if (number == "")
                throw new ArgumentNullException();

            var magazine = _magazineService.GetByNumber(number);
            return Ok(magazine);
        }

        [Route("numbers")]
        [HttpGet]
        public IHttpActionResult GetMagazineNumbers()
        {
            var numbers = _magazineService.GetMagazineNumbers();
            return Ok(numbers);
        }

    }
}
