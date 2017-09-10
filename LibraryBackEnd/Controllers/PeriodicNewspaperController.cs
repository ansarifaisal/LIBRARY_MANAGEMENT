using LibraryBackEnd.Core.Models;
using LibraryBackEnd.Core.Services.Interface;
using System;
using System.Web.Http;

namespace LibraryBackEnd.Controllers
{
    [Authorize]
    [RoutePrefix("api/newspaper/periodic")]
    public class PeriodicNewspaperController : ApiController
    {
        private IPeriodicNewspaperService _periodicNewpaperService;

        public PeriodicNewspaperController(IPeriodicNewspaperService periodicNewpaperService)
        {
            _periodicNewpaperService = periodicNewpaperService;
        }

        [Route("add")]
        [HttpPost]
        public IHttpActionResult AddPublication(PeriodicNewspaper periodicNewspaper)
        {
            if (!ModelState.IsValid)
                return BadRequest("Model is Invalid");

            _periodicNewpaperService.Create(periodicNewspaper);
            return Ok("Added Successfully!");
        }

        [Route("all")]
        [HttpGet]
        public IHttpActionResult All()
        {
            var publishers = _periodicNewpaperService.GetAll();
            return Ok(publishers);
        }

        [Route("edit")]
        [HttpPost]
        public IHttpActionResult Edit(PeriodicNewspaper periodicNewspaper)
        {
            if (!ModelState.IsValid)
                return BadRequest("Model is Invalid");

            _periodicNewpaperService.Update(periodicNewspaper);
            return Ok();
        }

        [Route("delete")]
        [HttpPost]
        public IHttpActionResult Delete(PeriodicNewspaper periodicNewspaper)
        {
            if (!ModelState.IsValid)
                return BadRequest("Model is Invalid");

            _periodicNewpaperService.Delete(periodicNewspaper);
            return Ok();
        }

        [Route("get/{Id}")]
        [HttpGet]
        public IHttpActionResult Get(int Id)
        {
            if (Id == 0)
                throw new ArgumentNullException();

            var periodicNewspaper = _periodicNewpaperService.SelectById(Id);

            if (periodicNewspaper == null)
                return NotFound();

            return Ok(periodicNewspaper);
        }

    }
}
