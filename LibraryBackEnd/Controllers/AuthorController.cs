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
            var flag = CheckExisting(author.Name);
            if (flag == true)
                return BadRequest("true");
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
            var flag = CheckExisting(author.Name);
            if (flag == true)
                return BadRequest("true");
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

        [HttpGet]
        [Route("byName")]
        public IHttpActionResult GetByName(string name)
        {
            if (name == null)
                return BadRequest();
            var authors = _authorService.matchName(name);
            if (authors == null)
                return BadRequest();
            return Ok(authors);
        }

        [HttpGet]
        [Route("checkExisting")]
        public bool CheckExisting(string name)
        {
            if (name == null)
                return false;
            var author = _authorService.GetByName(name);
            if (author == null)
                return false;
            return true;
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
