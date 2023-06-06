using Business.Abstract;
using Business.Contants;
using Business.ValidationRules.FluentValidation;
using Core.Aspects.Autofac.Validation;
using Core.Utilities.Business;
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
    public class RouteManager : IRouteService
    {
        IRouteDal _routeDal;
        public RouteManager(IRouteDal routeDal)
        {
            _routeDal = routeDal;
        }
        [ValidationAspect(typeof(RouteValidator))]
        public IResult Add(Route route)
        {
            var result = BusinessRules.Run(CheckIfRouteExists(route));
            if (result != null)
            {
                return result;
            }
            _routeDal.Add(route);
            return new SuccessResult(Messages.AddedSuccess);
        }

        public IResult Delete(Route route)
        {
            _routeDal.Delete(route);
            return new SuccessResult(Messages.DeletedSuccess);
        }

        public IDataResult<List<Route>> GetAll()
        {
            return new SuccessDataResult<List<Route>>(_routeDal.GetList());
        }
        public IDataResult<Route> GetByTownsId(int startTownId, int finishTownId)
        {
            return new SuccessDataResult<Route>(_routeDal.Get(r => r.StartTownId == startTownId && r.FinishTownId == finishTownId));
        }

        public IDataResult<Route> GetById(int id)
        {
            return new SuccessDataResult<Route>(_routeDal.Get(r => r.Id == id));
        }
        [ValidationAspect(typeof(RouteValidator))]
        public IResult Update(Route route)
        {
            var result = BusinessRules.Run(CheckIfRouteExists(route));
            if (result != null)
            {
                return result;
            }
            _routeDal.Update(route);
            return new SuccessResult(Messages.UpdatedSuccess);
        }

        public IDataResult<List<RouteDto>> GetAllRouteDto()
        {
            return new SuccessDataResult<List<RouteDto>>(_routeDal.GetAllTripDto());
        }
        private IResult CheckIfRouteExists(Route route)
        {
            var result = _routeDal.GetList(r => r.StartTownId == route.StartTownId && r.FinishTownId == route.FinishTownId && r.Id != route.Id).Any();
            if (result)
            {
                return new ErrorResult(Messages.RouteAlreadyExists);
            }
            return new SuccessResult();

        }

    }
}
