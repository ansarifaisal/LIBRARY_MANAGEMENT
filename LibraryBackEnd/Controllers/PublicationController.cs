using LibraryBackEnd.Core.Models;
using LibraryBackEnd.Core.Services.Interface;
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
        public IHttpActionResult add(Publication publication)
        {
            if (!ModelState.IsValid)
                return BadRequest("Model is Invalid");

            _publicationService.Create(publication);

            return Ok("Added Successfully!");
        }

    }
}
