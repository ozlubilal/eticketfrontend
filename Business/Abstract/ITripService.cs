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
    public interface ITripService
    {
        IDataResult<List<Trip>> GetAll();
        IDataResult<Trip> GetById(int id);
        IDataResult<List<Trip>> GetByRouteId(int routeId);
        IDataResult<List<Trip>> GetTripByStartTownIdAndFinishTownId(int startTownId, int finishTownId, DateTime date);
        IDataResult<List<TripDto>> GetByStartTownIdAndFinishTownId(int startTownId, int finishTownId, DateTime date);
        IDataResult<List<Trip>> GetByDate(DateTime date);
        IDataResult<List<TripDto>> GetAllTripDto();
        IResult Add(Trip trip);
        IResult Delete(Trip trip);
        IResult Update(Trip trip);
    }
}
