using Business.Abstract;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

using Entities.Concrete;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoutesController : ControllerBase
    {
        private IRouteService _routeService;
        public RoutesController(IRouteService routeService)
        {
            _routeService = routeService;
        }
        [HttpGet("getall")]
        public IActionResult GetAll()
        {
            var result = _routeService.GetAll();
            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result.Message);
        }
        [HttpGet("getallroutedto")]
        public IActionResult GetAllRouteDto()
        {
            var result = _routeService.GetAllRouteDto();
            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result.Message);
        }
        [HttpGet("getbyid")]
        public IActionResult GetById(int id)
        {
            var result = _routeService.GetById(id);
            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result.Message);
        }
        [HttpGet("getbytownsid")]
        public IActionResult GetByTownsId(int startTownId, int finishTownId)
        {
            var result = _routeService.GetByTownsId(startTownId, finishTownId);
            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result.Message);
        }
        [HttpPost("add")]
        public IActionResult Add(Entities.Concrete.Route route)
        {
            var result = _routeService.Add(route);
            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result.Message);
        }
        [HttpPost("delete")]
        public IActionResult Delete(Entities.Concrete.Route route)
        {
            var result = _routeService.Delete(route);
            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result.Message);
        }
        [HttpPost("update")]
        public IActionResult Update(Entities.Concrete.Route route)
        {
            var result = _routeService.Update(route);
            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result.Message);
        }
    }
}
