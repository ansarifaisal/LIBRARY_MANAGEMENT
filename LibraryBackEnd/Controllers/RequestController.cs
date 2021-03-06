﻿using LibraryBackEnd.Core.Models;
using LibraryBackEnd.Core.Services.Interface;
using System;
using System.Web.Http;

namespace LibraryBackEnd.Controllers
{
    [Authorize]
    [RoutePrefix("api/request")]
    public class RequestController : ApiController
    {
        private IRequestService _requestService;
        private ISendEmailService _sendEmailService;

        public RequestController(IRequestService requestService, ISendEmailService sendEmailService)
        {
            _requestService = requestService;
            _sendEmailService = sendEmailService;
        }

        [Route("add")]
        [HttpPost]
        public IHttpActionResult add(Request request)
        {
            if (!ModelState.IsValid)
                return BadRequest("Model is invalid");
            _requestService.Create(request);
            return Ok("Added Successfully!");
        }

        [Route("all")]
        [HttpGet]
        public IHttpActionResult GetAll()
        {
            var requests = _requestService.GetAll();
            return Ok(requests);
        }

        [Route("edit")]
        [HttpPost]
        public IHttpActionResult Edit(Request request)
        {
            if (!ModelState.IsValid)
                return BadRequest("Model is Invalid");
            _requestService.Update(request);
            return Ok("Updated Successfully!");
        }

        [HttpPost]
        [Route("delete")]
        public IHttpActionResult Delete(Request request)
        {
            if (!ModelState.IsValid)
                return BadRequest("Model is Invalid");
            _requestService.Delete(request);
            return Ok("Deleted Successfully!");
        }

        [HttpGet]
        [Route("get/{Id}")]
        public IHttpActionResult Get(int Id)
        {
            if (Id == 0)
                throw new ArgumentNullException();
            var request = _requestService.SelectById(Id);
            if (request == null)
                return BadRequest();

            return Ok(request);
        }

        [HttpGet]
        [Route("byRollNo")]
        public IHttpActionResult GetByRollNo(string rollNo)
        {
            if (rollNo == null)
                throw new ArgumentNullException();
            var requests = _requestService.GetByRollNo(rollNo);
            if (requests == null)
                return BadRequest();

            return Ok(requests);
        }

        [Route("updateStatus")]
        [HttpPost]
        public IHttpActionResult UpdateStatus(Request request)
        {
            if (!ModelState.IsValid)
                return BadRequest("Model is Invalid");
            if (request.Status == "APPROVED")
                _sendEmailService.sendApproveRequestConfirmation(request);
            if (request.Status == "REJECTED")
                _sendEmailService.sendRejectRequestConfirmation(request);
            if (request.Status == "COMPLETED")
                _sendEmailService.sendCompleteRequestConfirmation(request);

            _requestService.Update(request);
            return Ok("Updated Successfully!");
        }

    }
}
