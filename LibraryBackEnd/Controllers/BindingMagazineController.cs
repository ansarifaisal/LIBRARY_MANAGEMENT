using LibraryBackEnd.Core.Models;
using LibraryBackEnd.Core.Services.Interface;
using System;
using System.Web.Http;

namespace LibraryBackEnd.Controllers
{
    [Authorize]
    [RoutePrefix("api/magazine/bindingMagazine")]
    public class BindingMagazineController : ApiController
    {
        private IBindingMagazineService _bindingMagazineService;

        public BindingMagazineController(IBindingMagazineService bindingMagazineService)
        {
            _bindingMagazineService = bindingMagazineService;
        }


        [Route("add")]
        [HttpPost]
        public IHttpActionResult add(BindingMagazine bindingMagazine)
        {
            if (!ModelState.IsValid)
                return BadRequest("Model is Invalid");

            _bindingMagazineService.Create(bindingMagazine);

            return Ok("Added Successfully!");
        }

        [Route("all")]
        [HttpGet]
        public IHttpActionResult All()
        {
            var bindingMagazines = _bindingMagazineService.GetAll();
            return Ok(bindingMagazines);
        }

        [Route("edit")]
        [HttpPost]
        public IHttpActionResult Edit(BindingMagazine bindingMagazine)
        {
            if (!ModelState.IsValid)
                return BadRequest("Model is Invalid");

            _bindingMagazineService.Update(bindingMagazine);
            return Ok();
        }

        [Route("delete")]
        [HttpPost]
        public IHttpActionResult Delete(BindingMagazine bindingMagazine)
        {
            _bindingMagazineService.Delete(bindingMagazine);
            return Ok();
        }

        [HttpGet]
        [Route("checkExisting")]
        public bool CheckExisting(string name)
        {
            if (name == null)
                return false;
            var bindingMagazine = _bindingMagazineService.GetByName(name);
            if (bindingMagazine == null)
                return false;
            return true;
        }

        [HttpGet]
        [Route("checkExistingByNumber")]
        public bool CheckExistingByNumber(string number)
        {
            if (number == null)
                return false;
            var bindingMagazine = _bindingMagazineService.GetByNumber(number);
            if (bindingMagazine == null)
                return false;
            return true;
        }

        [Route("get/{Id}")]
        [HttpGet]
        public IHttpActionResult Get(int Id)
        {
            if (Id == 0)
                throw new ArgumentNullException();

            var bindingMagazine = _bindingMagazineService.SelectById(Id);

            if (bindingMagazine == null)
                return NotFound();

            return Ok(bindingMagazine);
        }
    }
}
