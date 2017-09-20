using LibraryBackEnd.Core.Models;
using LibraryBackEnd.Core.Services.Interface;
using System;
using System.Web.Http;

namespace LibraryBackEnd.Controllers
{
    [RoutePrefix("api/committee")]
    public class CommitteeMemberController : ApiController
    {
        private ICommitteeMemberService _committeeMemberService;

        public CommitteeMemberController(ICommitteeMemberService committeeMemberService)
        {
            _committeeMemberService = committeeMemberService;
        }

        [Route("add")]
        [HttpPost]
        public IHttpActionResult add(CommitteeMember committeeMember)
        {
            committeeMember.Date = DateTime.Now;

            if (!ModelState.IsValid)
                return BadRequest("Model is Invalid");

            _committeeMemberService.Create(committeeMember);

            return Ok("Added Successfully!");
        }

        [Route("all")]
        [HttpGet]
        public IHttpActionResult All()
        {
            var committeeMembers = _committeeMemberService.GetAll();
            return Ok(committeeMembers);
        }

        [Route("edit")]
        [HttpPost]
        public IHttpActionResult Edit(CommitteeMember committeeMember)
        {
            if (!ModelState.IsValid)
                return BadRequest("Model is Invalid");

            _committeeMemberService.Update(committeeMember);
            return Ok();
        }

        [Route("delete")]
        [HttpPost]
        public IHttpActionResult Delete(CommitteeMember committeeMember)
        {
            if (!ModelState.IsValid)
                return BadRequest("Model is Invalid");

            _committeeMemberService.Delete(committeeMember);
            return Ok();
        }


        [Route("get/{Id}")]
        [HttpGet]
        public IHttpActionResult Get(int Id)
        {
            if (Id == 0)
                throw new ArgumentNullException();

            var committeeMember = _committeeMemberService.SelectById(Id);

            if (committeeMember == null)
                return NotFound();

            return Ok(committeeMember);
        }

        [Route("byName")]
        [HttpGet]
        public IHttpActionResult GetByName(string name)
        {
            if (name == "")
                throw new ArgumentNullException();

            var committeeMember = _committeeMemberService.GetByName(name);

            return Ok(committeeMember);
        }
    }
}
