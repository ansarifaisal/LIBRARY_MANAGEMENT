using LibraryBackEnd.Core.Models;
using LibraryBackEnd.Core.Services.Class;
using System;
using System.Web.Http;

namespace LibraryBackEnd.Controllers
{
    [Authorize]
    [RoutePrefix("api/magazine/lost")]
    public class LostOrReplaceMagazineController : ApiController
    {
        private LostOrReplaceMagazineService _lostOrReplaceMagazineService;
        private StudentService _studentService;
        private MagazineService _magazineService;

        public LostOrReplaceMagazineController(
            LostOrReplaceMagazineService lostOrReplaceMagazineService,
            StudentService studentService,
            MagazineService magazineService)
        {
            _lostOrReplaceMagazineService = lostOrReplaceMagazineService;
            _studentService = studentService;
            _magazineService = magazineService;
        }

        [Route("add")]
        public IHttpActionResult Add(LostOrReplaceMagazine lostOrReplaceMagazine)
        {
            if (!ModelState.IsValid)
                return BadRequest("Model is Invalid");
            var magazine = _magazineService.GetByNumber(lostOrReplaceMagazine.Number);
            if (magazine == null)
                return BadRequest("Magazine Not Found");
            magazine.Status = "Lost";
            _magazineService.Update(magazine);

            var student = _studentService.GetByRollNo(lostOrReplaceMagazine.RollNo);
            if (student == null)
                return BadRequest("User Not Found");
            student.Status = "Default";
            student.IssueCount = student.IssueCount - 1;
            _studentService.Update(student);

            _lostOrReplaceMagazineService.Create(lostOrReplaceMagazine);
            return Ok("Added Successfully!");
        }

        [Route("all")]
        [HttpGet]
        public IHttpActionResult All()
        {
            var publications = _lostOrReplaceMagazineService.GetAll();
            return Ok(publications);
        }

        [Route("edit")]
        [HttpPost]
        public IHttpActionResult Edit(LostOrReplaceMagazine lostOrReplaceMagazine)
        {
            if (!ModelState.IsValid)
                return BadRequest("Model is Invalid");

            var magazine = _magazineService.GetByNumber(lostOrReplaceMagazine.Number);
            if (magazine == null)
                return BadRequest("Magazine Not Found");
            magazine.Status = "Replaced";
            _magazineService.Update(magazine);

            var student = _studentService.GetByRollNo(lostOrReplaceMagazine.RollNo);
            if (student == null)
                return BadRequest("User Not Found");
            student.Status = "APPROVED";
            _studentService.Update(student);

            _lostOrReplaceMagazineService.Update(lostOrReplaceMagazine);
            return Ok();
        }


        [Route("undoReplace")]
        [HttpPost]
        public IHttpActionResult UndoReplace(LostOrReplaceMagazine lostOrReplaceMagazine)
        {
            if (!ModelState.IsValid)
                return BadRequest("Model is Invalid");

            var magazine = _magazineService.GetByNumber(lostOrReplaceMagazine.Number);
            if (magazine == null)
                return BadRequest("Magazine Not Found");
            magazine.Status = "Lost";
            _magazineService.Update(magazine);

            var student = _studentService.GetByRollNo(lostOrReplaceMagazine.RollNo);
            if (student == null)
                return BadRequest("User Not Found");
            student.Status = "Default";
            _studentService.Update(student);

            _lostOrReplaceMagazineService.Update(lostOrReplaceMagazine);
            return Ok();
        }



        [Route("delete")]
        [HttpPost]
        public IHttpActionResult Delete(LostOrReplaceMagazine lostOrReplaceMagazine)
        {
            if (!ModelState.IsValid)
                return BadRequest("Model is Invalid");

            _lostOrReplaceMagazineService.Delete(lostOrReplaceMagazine);
            return Ok();
        }

        //[Route("checkExisting")]
        //[HttpGet]
        //public bool CheckExisting(string name)
        //{
        //    if (name == null)
        //        return false;
        //    var publication = _lostOrReplaceMagazineService.GetByName(name);
        //    if (publication == null)
        //        return false;
        //    return true;
        //}

        [Route("get/{Id}")]
        [HttpGet]
        public IHttpActionResult Get(int Id)
        {
            if (Id == 0)
                throw new ArgumentNullException();

            var magazine = _lostOrReplaceMagazineService.SelectById(Id);

            if (magazine == null)
                return NotFound();

            return Ok(magazine);
        }
    }
}
