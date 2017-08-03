using LibraryBackEnd.Core.Models;
using LibraryBackEnd.Core.Services.Interface;
using System;
using System.Web.Http;

namespace LibraryBackEnd.Controllers
{
    [Authorize]
    [RoutePrefix("api/author")]
    public class AuthorController : ApiController
    {
        private IAuthorService _authorService;

        public AuthorController(IAuthorService authorService)
        {
            _authorService = authorService;
        }

        [Route("add")]
        [HttpPost]
        public IHttpActionResult add(Author author)
        {
            if (!ModelState.IsValid)
                return BadRequest("Model is Invalid");

            _authorService.Create(author);

            return Ok("Added Successfully!");
        }

        [Route("all")]
        [HttpGet]
        public IHttpActionResult All()
        {
            var authors = _authorService.GetAll();
            return Ok(authors);
        }

        [Route("edit")]
        [HttpPost]
        public IHttpActionResult Edit(Author author)
        {
            if (!ModelState.IsValid)
                return BadRequest("Model is Invalid");

            _authorService.Update(author);
            return Ok();
        }

        [Route("delete")]
        [HttpPost]
        public IHttpActionResult Delete(Author author)
        {
            _authorService.Delete(author);
            return Ok();
        }

        [Route("get/{Id}")]
        [HttpGet]
        public IHttpActionResult Get(int Id)
        {
            if (Id == 0)
                throw new ArgumentNullException();

            var publication = _authorService.SelectById(Id);

            if (publication == null)
                return NotFound();

            return Ok(publication);
        }

    }
}
