using Business.Abstract;
using Entities.Concrete;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TripStatesController : ControllerBase
    {
        private ITripStateService _tripStateService;
        public TripStatesController(ITripStateService tripState)
        {
            _tripStateService = tripState;
        }
        [HttpGet("getall")]
        public IActionResult GetAll()
        {
            var result = _tripStateService.GetAll();
            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result.Message);
        }
        [HttpGet("getbyid")]
        public IActionResult GetByid(int id)
        {
            var result = _tripStateService.GetById(id);
            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result.Message);

        }
        [HttpPost("add")]
        public IActionResult Add(TripState tripstate)
        {
            var result = _tripStateService.Add(tripstate);
            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result.Message);
        }
        [HttpPost("delete")]
        public IActionResult Delete(TripState tripstate)
        {
            var result = _tripStateService.Delete(tripstate);
            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result.Message);
        }
        [HttpPost("update")]
        public IActionResult Update(TripState tripstate)
        {
            var result = _tripStateService.Update(tripstate);
            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result.Message);
        }
    }
}
