using Business.Abstract;
using Business.Contants;
using Business.ValidationRules.FluentValidation;
using Core.Aspects.Autofac.Validation;
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
    public class GenderManager : IGenderService
    {
        IGenderDal _genderDal;
        public GenderManager(IGenderDal genderDal)
        {
            _genderDal = genderDal;
        }
        [ValidationAspect(typeof(GenderValidator))]
        public IResult Add(Gender gender)
        {
            _genderDal.Add(gender);
            return new SuccessResult(Messages.AddedSuccess);
        }

        public IResult Delete(Gender gender)
        {
            _genderDal.Delete(gender);
            return new SuccessResult(Messages.DeletedSuccess);
        }

        public IDataResult<List<Gender>> GetAll()
        {
            return new SuccessDataResult<List<Gender>>(_genderDal.GetList().ToList());
        }

        public IDataResult<Gender> GetById(int id)
        {
            return new SuccessDataResult<Gender>(_genderDal.Get(g => g.Id == id));
        }

        public IResult Update(Gender gender)
        {
            _genderDal.Update(gender);
            return new SuccessResult(Messages.UpdatedSuccess);
        }
        private IResult CheckIfGenderNameExists(Gender gender)
        {
            var result = _genderDal.GetList(g => g.GenderName == gender.GenderName && g.Id != gender.Id).Any();
            if (result)
            {
                return new ErrorResult(Messages.GenderNameAlreadyExist);
            }
            return new SuccessResult();
        }
    }
}
