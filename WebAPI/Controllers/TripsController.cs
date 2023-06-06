using Business.Abstract;
using Entities.Concrete;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TripsController : ControllerBase
    {
        private ITripService _tripService;
        public TripsController(ITripService tripService)
        {
            _tripService = tripService;
        }
        [HttpGet("getall")]
        public IActionResult GetAll()
        {
            var result = _tripService.GetAll();
            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result.Message);
        }
        [HttpGet("getbyid")]
        public IActionResult GetById(int id)
        {
            var result = _tripService.GetById(id);
            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result.Message);
        }
        [HttpGet("getbyrouteid")]
        public IActionResult GetByRouteId(int routeId)
        {
            var result = _tripService.GetByRouteId(routeId);
            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result.Message);
        }

        [HttpGet("getbydate")]
        public IActionResult GetByDate(DateTime date)
        {
            var result = _tripService.GetByDate(date);
            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result.Message);
        }
        [HttpGet("gettripbystarttownidandfinishtownid")]
        public IActionResult GetTripByStartTownIdAndFinishTownId(int startTownId, int finishTownId, DateTime date)
        {
            var result = _tripService.GetTripByStartTownIdAndFinishTownId(startTownId, finishTownId, date);
            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result.Message);
        }
        [HttpGet("getbystarttownidandfinishtownid")]
        public IActionResult GetByStartTownIdAndFinishTownId(int startTownId, int finishTownId, DateTime date)
        {
            var result = _tripService.GetByStartTownIdAndFinishTownId(startTownId, finishTownId, date);
            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result.Message);
        }
        [HttpGet("getalltripdto")]
        public IActionResult GetAllTripDto()
        {
            var result = _tripService.GetAllTripDto();
            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result.Message);
        }
        [HttpPost("add")]
        public IActionResult Add(Trip trip)
        {
            var result = _tripService.Add(trip);
            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result.Message);
        }
        [HttpPost("delete")]
        public IActionResult Delete(Trip trip)
        {
            var result = _tripService.Delete(trip);
            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result.Message);
        }
        [HttpPost("Update")]
        public IActionResult Update(Trip trip)
        {
            var result = _tripService.Update(trip);
            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result.Message);
        }
    }
}
