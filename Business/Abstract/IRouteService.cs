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
    public interface IRouteService
    {
        IDataResult<List<Route>> GetAll();
        IDataResult<Route> GetById(int id);
        IDataResult<Route> GetByTownsId(int startTownId, int finishTownId);
        IDataResult<List<RouteDto>> GetAllRouteDto();
        IResult Add(Route route);
        IResult Delete(Route route);
        IResult Update(Route route);
    }
}
