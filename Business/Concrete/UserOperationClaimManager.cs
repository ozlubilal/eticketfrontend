using Business.Abstract;
using Business.Contants;
using Business.ValidationRules.FluentValidation;
using Core.Aspects.Autofac.Validation;
using Core.Entities.Concrete;
using Core.Utilities.Business;
using Core.Utilities.Results;
using DataAccess_.Abstract;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Concrete
{
    public class UserOperationClaimManager : IUserOperationClaimService
    {
        IUserOperationClaimDal _userOperationClaimDal;
        public UserOperationClaimManager(IUserOperationClaimDal userOperationClaimDal)
        {
            _userOperationClaimDal = userOperationClaimDal;

        }
        [ValidationAspect(typeof(UserOperationClaimValidator))]
        public IResult Add(UserOperationClaim userOperationClaim)
        {
            var result = BusinessRules.Run(CheckIfUserIdExists(userOperationClaim));
            if (result != null)
            {
                return result;
            }
            _userOperationClaimDal.Add(userOperationClaim);
            return new SuccessResult(Messages.AddedSuccess);
        }

        public IResult Delete(UserOperationClaim userOperationClaim)
        {
            _userOperationClaimDal.Delete(userOperationClaim);
            return new SuccessResult(Messages.DeletedSuccess);
        }

        public IDataResult<List<UserOperationClaim>> GetAll()
        {
            return new SuccessDataResult<List<UserOperationClaim>>(_userOperationClaimDal.GetList());
        }

        public IDataResult<List<UserOperationClaim>> GetByClaimId(int id)
        {
            return new SuccessDataResult<List<UserOperationClaim>>(_userOperationClaimDal.GetList(c => c.OperationClaimId == id));
        }

        public IDataResult<UserOperationClaim> GetByUserId(int id)
        {
            return new SuccessDataResult<UserOperationClaim>(_userOperationClaimDal.GetList(c => c.UserId == id).FirstOrDefault());
        }
        [ValidationAspect(typeof(UserOperationClaimValidator))]
        public IResult Update(UserOperationClaim userOperationClaim)
        {
            var result = BusinessRules.Run(CheckIfUserIdExists(userOperationClaim));
            if (result != null)
            {
                return result;
            }
            _userOperationClaimDal.Update(userOperationClaim);
            return new SuccessResult(Messages.UpdatedSuccess);
        }
        private IResult CheckIfUserIdExists(UserOperationClaim userOperationClaim)
        {
            var result = _userOperationClaimDal.GetList(u => u.UserId == userOperationClaim.UserId).Any();
            if (result)
            {
                return new ErrorResult(Messages.UserIdAlreadyExists);
            }
            return new SuccessResult();
        }
    }

}
