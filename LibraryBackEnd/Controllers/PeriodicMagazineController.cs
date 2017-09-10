using LibraryBackEnd.Core.Models;
using LibraryBackEnd.Core.Services.Interface;
using System;
using System.Web.Http;

namespace LibraryBackEnd.Controllers
{
    [Authorize]
    [RoutePrefix("api/magazine")]
    public class PeriodicMagazineController : ApiController
    {
        private IPeriodicMagazineService _periodicMagazineService;
        public PeriodicMagazineController(IPeriodicMagazineService periodicMagazineService)
        {
            _periodicMagazineService = periodicMagazineService;
        }

        [Route("periodic/all")]
        [HttpGet]
        public IHttpActionResult All()
        {
            var periodicMagazineDetails = _periodicMagazineService.GetAll();
            return Ok(periodicMagazineDetails);
        }

        [Route("periodic/add")]
        [HttpPost]
        public IHttpActionResult AddPublication(PeriodicMagazine periodicMagazine)
        {
            if (!ModelState.IsValid)
                return BadRequest("Model is Invalid");

            var flag = CheckExisting(periodicMagazine.Title);

            if (flag == true)
                return BadRequest("true");

            _periodicMagazineService.Create(periodicMagazine);
            return Ok("Added Successfully!");
        }

        [Route("periodic/edit")]
        [HttpPost]
        public IHttpActionResult Edit(PeriodicMagazine periodicMagazine)
        {
            if (!ModelState.IsValid)
                return BadRequest("Model is Invalid");
            _periodicMagazineService.Update(periodicMagazine);
            return Ok();
        }

        [Route("periodic/delete")]
        [HttpPost]
        public IHttpActionResult Delete(PeriodicMagazine periodicMagazine)
        {
            if (!ModelState.IsValid)
                return BadRequest("Model is Invalid");

            _periodicMagazineService.Delete(periodicMagazine);
            return Ok();
        }

        [Route("get/periodic/{Id}")]
        [HttpGet]
        public IHttpActionResult Get(int Id)
        {
            if (Id == 0)
                throw new ArgumentNullException();

            var magazinePublisher = _periodicMagazineService.SelectById(Id);

            if (magazinePublisher == null)
                return NotFound();

            return Ok(magazinePublisher);
        }

        public bool CheckExisting(string title)
        {
            if (title == null)
                return false;
            var periodicMagazine = _periodicMagazineService.GetByTitle(title);
            if (periodicMagazine == null)
                return false;
            return true;
        }

        [Route("periodic/checkExisting")]
        [HttpGet]
        public IHttpActionResult checkExisting(string title)
        {
            if (title == null)
                throw new ArgumentNullException();
            var periodicMagazine = _periodicMagazineService.GetByTitle(title);
            return Ok(periodicMagazine);
        }


    }
}
