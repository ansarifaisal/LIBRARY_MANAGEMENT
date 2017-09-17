using LibraryBackEnd.Core.Models;
using LibraryBackEnd.Core.Services.Interface;
using System.Web.Http;

namespace LibraryBackEnd.Controllers
{
    [RoutePrefix("api/configuration")]
    public class SiteConfigurationController : ApiController
    {
        private ISiteConfigurationService _siteConfigurationService;
        public SiteConfigurationController(ISiteConfigurationService siteConfigurationService)
        {
            _siteConfigurationService = siteConfigurationService;
        }

        [Route("all")]
        [HttpGet]
        public IHttpActionResult All()
        {
            var configurations = _siteConfigurationService.GetAll();
            return Ok(configurations);
        }

        [Route("get/{id}")]
        [HttpGet]
        public IHttpActionResult GetConfiguration(int id)
        {
            var configuration = _siteConfigurationService.SelectById(id);
            return Ok(configuration);
        }

        [Route("add")]
        [HttpPost]
        public IHttpActionResult Add(SiteConfiguration siteConfiguration)
        {
            if (!ModelState.IsValid)
                return BadRequest("Model is Invalid");

            _siteConfigurationService.Create(siteConfiguration);
            return Ok();
        }

        [Route("edit")]
        [HttpPost]
        public IHttpActionResult Edit(SiteConfiguration siteConfiguration)
        {
            if (!ModelState.IsValid)
                return BadRequest("Model is Invalid");

            _siteConfigurationService.Update(siteConfiguration);
            return Ok();
        }
    }
}
