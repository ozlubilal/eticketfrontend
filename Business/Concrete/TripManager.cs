using Business.Abstract;
using Business.Contants;
using Business.ValidationRules.FluentValidation;
using Core.Aspects.Autofac.Validation;
using Core.Utilities.Results;
using DataAccess_.Abstract;
using Entities.Concrete;
using Entities.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Concrete
{
    public class TripManager : ITripService
    {
        private ITripDal _tripDal;
        private IRouteService _routeService;
        public TripManager(ITripDal tripDal, IRouteService routeService)
        {
            _tripDal = tripDal;
            _routeService = routeService;
        }
        [ValidationAspect(typeof(TripValidator))]
        public IResult Add(Trip trip)
        {
            _tripDal.Add(trip);
            return new SuccessResult(Messages.AddedSuccess);
        }

        public IResult Delete(Trip trip)
        {
            _tripDal.Delete(trip);
            return new SuccessResult(Messages.DeletedSuccess);
        }

        public IDataResult<List<Trip>> GetAll()
        {
            return new SuccessDataResult<List<Trip>>(_tripDal.GetList().ToList());
        }

        public IDataResult<Trip> GetById(int id)
        {
            return new SuccessDataResult<Trip>(_tripDal.Get(t => t.Id == id));

        }

        public IDataResult<List<Trip>> GetByRouteId(int routeId)
        {
            return new SuccessDataResult<List<Trip>>(_tripDal.GetList(t => t.RouteId == routeId).ToList());
        }
        public IDataResult<List<Trip>> GetByDate(DateTime date)
        {
            return new SuccessDataResult<List<Trip>>(_tripDal.GetList(t => t.Date == date).ToList());
        }

        public IDataResult<List<TripDto>> GetByStartTownIdAndFinishTownId(int startTownId, int finishTownId, DateTime date)
        {
            List<Trip> tripList = new List<Trip>();
            List<TripDto> tripDtoList = new List<TripDto>();
            var route = _routeService.GetByTownsId(startTownId, finishTownId).Data;
            if (route!=null)
            {
                tripList = _tripDal.GetList(t => t.RouteId == route.Id).ToList();
                foreach (var item in tripList)
                {
                    tripDtoList.AddRange(_tripDal.GetAllTripDto(t => t.Id == item.Id && t.Date == date).ToList());
                }
            }

            return new SuccessDataResult<List<TripDto>>(tripDtoList);

        }
        [ValidationAspect(typeof(TripValidator))]
        public IResult Update(Trip trip)
        {
            _tripDal.Update(trip);
            return new SuccessResult(Messages.UpdatedSuccess);
        }

        public IDataResult<List<TripDto>> GetAllTripDto()
        {
            return new SuccessDataResult<List<TripDto>>(_tripDal.GetAllTripDto());
        }

        public IDataResult<List<Trip>> GetTripByStartTownIdAndFinishTownId(int startTownId, int finishTownId, DateTime date)
        {
            List<Trip> tripList = new List<Trip>();
            var route = _routeService.GetByTownsId(startTownId, finishTownId).Data;

            tripList = _tripDal.GetList(t => t.RouteId == route.Id && t.Date == date).ToList();

            return new SuccessDataResult<List<Trip>>(tripList);
        }
    }
}
