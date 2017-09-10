using LibraryBackEnd.Core.Models;
using LibraryBackEnd.Core.Services.Class;
using System;
using System.Web.Http;

namespace LibraryBackEnd.Controllers
{
    [Authorize]
    [RoutePrefix("api/issuedMagazine")]
    public class IssueMagazineController : ApiController
    {
        private IssueMagazineService _issueMagazineService;
        private MagazineService _magazineService;
        private StudentService _studentService;
        private ReturnMagazineService _returnMagazineService;

        public IssueMagazineController(
            IssueMagazineService issueMagazineService,
            MagazineService magazineService,
            StudentService studentService,
            ReturnMagazineService returnMagazineService)
        {
            _issueMagazineService = issueMagazineService;
            _magazineService = magazineService;
            _studentService = studentService;
            _returnMagazineService = returnMagazineService;
        }

        [Route("add")]
        [HttpPost]
        public IHttpActionResult Add(IssueMagazine issueMagazine)
        {
            if (!ModelState.IsValid)
                return BadRequest("Model is Invalid");

            var student = _studentService.GetByRollNo(issueMagazine.RollNo);
            if (student == null)
                return BadRequest("User Not Found");
            if (student.Status == "Default")
                return BadRequest("User Status is Default");
            if (student.IssueCount >= 2)
                return BadRequest("Already took " + student.IssueCount);
            student.IssueCount = student.IssueCount + 1;
            _studentService.Update(student);

            var magazine = _magazineService.GetByNumber(issueMagazine.Number);
            if (magazine == null)
                return BadRequest("Magazine Not Found");
            if (magazine.Status == "Lost")
                return BadRequest("Book is Lost");
            if (magazine.Status == "Issued")
                return BadRequest("Already Issued");
            magazine.Status = "Issued";
            _magazineService.Update(magazine);

            _issueMagazineService.Create(issueMagazine);
            return Ok();
        }

        [Route("all")]
        [HttpGet]
        public IHttpActionResult All()
        {
            var issueMagazine = _issueMagazineService.GetAll();
            return Ok(issueMagazine);
        }

        [Route("edit")]
        [HttpPost]
        public IHttpActionResult Edit(IssueMagazine issueMagazine)
        {
            if (!ModelState.IsValid)
                return BadRequest("Model is Invalid");

            _issueMagazineService.Update(issueMagazine);
            return Ok();
        }

        [Route("delete")]
        [HttpPost]
        public IHttpActionResult Delete(IssueMagazine issueMagazine)
        {
            if (!ModelState.IsValid)
                return BadRequest("Model is Invalid");

            _issueMagazineService.Delete(issueMagazine);
            return Ok();
        }

        [Route("return")]
        [HttpPost]
        public IHttpActionResult Return(ReturnMagazine returnMagazine)
        {
            if (!ModelState.IsValid)
                return BadRequest("Model is Invalid");
            var magazine = _magazineService.GetByNumber(returnMagazine.Number);
            if (magazine == null)
                return BadRequest("Magazine Not Found");
            magazine.Status = "Available";
            _magazineService.Update(magazine);
            var student = _studentService.GetByRollNo(returnMagazine.RollNo);
            if (student == null)
                return BadRequest("User Not Found");
            student.IssueCount = student.IssueCount - 1;
            student.Fine = student.Fine - returnMagazine.Fine;
            _studentService.Update(student);

            _returnMagazineService.Create(returnMagazine);
            return Ok("Magazine Returned Successfully!");
        }

        [Route("get/{Id}")]
        [HttpGet]
        public IHttpActionResult Get(int Id)
        {
            if (Id == 0)
                throw new ArgumentNullException();
            var issueMagazine = _issueMagazineService.SelectById(Id);
            if (issueMagazine == null)
                return NotFound();
            return Ok(issueMagazine);
        }

    }
}
