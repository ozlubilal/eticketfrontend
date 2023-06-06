using Business.Abstract;
using Business.Contants;
using Core.Utilities.Business;
using Core.Utilities.Results;
using DataAccess_.Abstract;
using Entities.Concrete;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Concrete
{



    public class TripStateManager : ITripStateService
    {
        ITripStateDal _tripStateDal;
        public TripStateManager(ITripStateDal tripStateDal)
        {
            _tripStateDal = tripStateDal;
        }
        public IResult Add(TripState tripState)
        {
            var result = BusinessRules.Run(CheckIfTripStateExists(tripState));
            if (result != null)
            {
                return result;
            }

            _tripStateDal.Add(tripState);
            return new SuccessResult(Messages.AddedSuccess);
        }

        public IResult Delete(TripState tripState)
        {
            _tripStateDal.Delete(tripState);
            return new SuccessResult(Messages.AddedSuccess);
        }

        public IDataResult<List<TripState>> GetAll()
        {
            return new SuccessDataResult<List<TripState>>(_tripStateDal.GetList().ToList());
        }

        public IDataResult<TripState> GetById(int id)
        {
            return new SuccessDataResult<TripState>(_tripStateDal.Get(t => t.Id == id));
        }

        public IResult Update(TripState tripState)
        {
            var result = BusinessRules.Run(CheckIfTripStateExists(tripState));
            if (result != null)
            {
                return result;
            }
            _tripStateDal.Update(tripState);
            return new SuccessResult(Messages.UpdatedSuccess);
        }
        IResult CheckIfTripStateExists(TripState tripState)
        {
            var result = _tripStateDal.GetList(t => t.StateName == tripState.StateName && t.Id != tripState.Id).Any();
            if (result)
            {
                return new ErrorResult(Messages.TripStateAlreadyExists);
            }
            return new SuccessResult();

        }
    }
}
