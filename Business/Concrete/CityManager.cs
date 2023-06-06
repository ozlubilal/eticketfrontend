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
    public class CityManager : ICityService
    {
        ICityDal _cityDal;
        public CityManager(ICityDal cityDal)
        {
            _cityDal = cityDal;
        }
        public IResult Add(City city)
        {
            IResult result = BusinessRules.Run(CheckIfBusTypeNameExists(city));
            if (result != null)
            {
                return result;
            }
            _cityDal.Add(city);
            return new SuccessResult(Messages.AddedSuccess);
        }

        public IResult Delete(City city)
        {

            _cityDal.Delete(city);
            return new SuccessResult(Messages.DeletedSuccess);
        }

        public IDataResult<List<City>> GetAll()
        {
            return new SuccessDataResult<List<City>>(_cityDal.GetList().ToList());
        }

        public IDataResult<City> GetById(int id)
        {
            return new SuccessDataResult<City>(_cityDal.Get(c => c.Id == id));
        }

        public IResult Update(City city)
        {
            IResult result = BusinessRules.Run(CheckIfBusTypeNameExists(city));
            if (result != null)
            {
                return result;
            }
            _cityDal.Update(city);
            return new SuccessResult(Messages.UpdatedSuccess);
        }
        private IResult CheckIfBusTypeNameExists(City city)
        {

            var result = _cityDal.GetList(c => c.CityName == city.CityName && c.Id != city.Id).Any();
            if (result)
            {
                return new ErrorResult(Messages.CityNameAlreadyExists);
            }

            return new SuccessResult();
        }
    }
}
