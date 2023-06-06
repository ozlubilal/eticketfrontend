using Core.Utilities.Results;
using Entities.Concrete;
using Entities.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Abstract
{
    public interface ITownService
    {
        IDataResult<List<Town>> GetAll();
        IDataResult<Town> GetById(int id);
        IDataResult<List<Town>> GetByCityId(int cityId);
        IDataResult<List<TownDto>> GetAllTownDto();
        IDataResult<List<TownDto>> GetTownDtoByTownName(string townName);
        IDataResult<List<TownDto>> GetTownDtoByCityName(string cityName);
        IResult Add(Town town);
        IResult Delete(Town town);
        IResult Update(Town town);
    }
}
