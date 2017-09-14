using LibraryBackEnd.Core.Models;
using LibraryBackEnd.Core.Services.Interface;
using System;
using System.Web.Http;

namespace LibraryBackEnd.Controllers
{
    [Authorize]
    [RoutePrefix("api/publication")]
    public class PublicationController : ApiController
    {
        private IPublicationService _publicationService;

        public PublicationController(IPublicationService publicationService)
        {
            _publicationService = publicationService;

        }

        [Route("add")]
        public IHttpActionResult Add(Publication publication)
        {
            if (!ModelState.IsValid)
                return BadRequest("Model is Invalid");

            var flag = CheckExisting(publication.Name);

            if (flag == true)
                return BadRequest("true");

            _publicationService.Create(publication);
            return Ok("Added Successfully!");
        }

        [Route("all")]
        [HttpGet]
        public IHttpActionResult All()
        {
            var publications = _publicationService.GetAll();
            return Ok(publications);
        }

        [Route("edit")]
        [HttpPost]
        public IHttpActionResult Edit(Publication publication)
        {
            if (!ModelState.IsValid)
                return BadRequest("Model is Invalid");

            _publicationService.Update(publication);
            return Ok();
        }

        [Route("delete")]
        [HttpPost]
        public IHttpActionResult Delete(Publication publication)
        {
            if (!ModelState.IsValid)
                return BadRequest("Model is Invalid");

            _publicationService.Delete(publication);
            return Ok();
        }

        [Route("checkExisting")]
        [HttpGet]
        public bool CheckExisting(string name)
        {
            if (name == null)
                return false;
            var publication = _publicationService.GetByName(name);
            if (publication == null)
                return false;
            return true;
        }

        [Route("checkExistingName")]
        [HttpGet]
        public IHttpActionResult CheckExistingName(string name)
        {
            if (name == null)
                throw new ArgumentNullException();
            var publication = _publicationService.GetByName(name);
            return Ok(publication);
        }

        [Route("get/{Id}")]
        [HttpGet]
        public IHttpActionResult Get(int Id)
        {
            if (Id == 0)
                throw new ArgumentNullException();

            var publication = _publicationService.SelectById(Id);

            if (publication == null)
                return NotFound();

            return Ok(publication);
        }
    }
}
