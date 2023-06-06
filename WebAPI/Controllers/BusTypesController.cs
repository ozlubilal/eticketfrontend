using Business.Abstract;
using Entities.Concrete;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BusTypesController : ControllerBase
    {
        private IBusTypeService _busTypeService;
        public BusTypesController(IBusTypeService busTypeService)
        {
            _busTypeService = busTypeService;
        }
        [HttpGet("getall")]
        public IActionResult GetAll()
        {
            var result = _busTypeService.GetAll();
            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result.Message);

        }
        [HttpGet("getbyid")]
        public IActionResult GetById(int id)
        {
            var result = _busTypeService.GetById(id);
            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result.Message);
        }
        [HttpPost("add")]
        public IActionResult Add(BusType busType)
        {
            var result = _busTypeService.Add(busType);
            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result.Message);

        }
        [HttpPost("delete")]
        public IActionResult Delete(BusType busType)
        {
            var result = _busTypeService.Delete(busType);
            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result.Message);

        }
        [HttpPost("update")]
        public IActionResult Update(BusType busType)
        {
            var result = _busTypeService.Update(busType);
            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result.Message);

        }

    }
}
