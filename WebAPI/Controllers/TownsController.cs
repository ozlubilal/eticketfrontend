using Business.Abstract;
using Entities.Concrete;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TownsController : ControllerBase
    {
        private ITownService _townService;
        public TownsController(ITownService townService)
        {
            _townService = townService;
        }
        [HttpGet("getall")]
        public IActionResult GetAll()
        {
            var result = _townService.GetAll();
            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result.Message);
        }
        [HttpGet("getbyid")]
        public IActionResult GetById(int id)
        {
            var result = _townService.GetById(id);
            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result.Message);
        }
        [HttpGet("getbycityid")]
        public IActionResult GetByCityId(int cityId)
        {
            var result = _townService.GetByCityId(cityId);
            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result.Message);
        }
        [HttpGet("getalltowndto")]
        public IActionResult GetAllTownDto()
        {
            var result = _townService.GetAllTownDto();
            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result.Message);
        }
        [HttpGet("gettowndtobytownname")]
        public IActionResult GetByTownName(string townName)
        {
            var result = _townService.GetTownDtoByTownName(townName);
            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result.Message);
        }
        [HttpGet("gettowndtobycityname")]
        public IActionResult GetByCityName(string cityName)
        {
            var result = _townService.GetTownDtoByCityName(cityName);
            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result.Message);
        }

        [HttpPost("add")]
        public IActionResult Add(Town town)
        {
            var result = _townService.Add(town);
            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result.Message);
        }
        [HttpPost("delete")]
        public IActionResult Delete(Town town)
        {
            var result = _townService.Delete(town);
            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result.Message);
        }
        [HttpPost("update")]
        public IActionResult Update(Town town)
        {
            var result = _townService.Update(town);
            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result.Message);
        }
    }
}
