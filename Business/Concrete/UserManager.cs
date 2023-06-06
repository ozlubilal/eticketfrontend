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
    public class UserManager : IUserService
    {
        private IUserDal _userDal;
        private IUserOperationClaimService _userOperationClaimService;
        public UserManager(IUserDal userDal, IUserOperationClaimService userOperationClaimService)
        {
            _userOperationClaimService = userOperationClaimService;
            _userDal = userDal;
        }

        [ValidationAspect(typeof(UserValidator))]
        public IResult Add(User user)
        {
            _userDal.Add(user);
            return new SuccessResult(Messages.AddedSuccess);
        }

        public IResult Delete(User user)
        {
            _userDal.Delete(user);
            _userOperationClaimService.Delete(_userOperationClaimService.GetByUserId(user.Id).Data);
            return new SuccessResult(Messages.DeletedSuccess);
        }

        public IDataResult<List<User>> GetAll()
        {
            return new SuccessDataResult<List<User>>(_userDal.GetList().ToList());
        }

        public IDataResult<List<UserDetailDto>> GetAllUserDto()
        {
            return new SuccessDataResult<List<UserDetailDto>>(_userDal.GetUserDetails());
        }

        public IDataResult<User> GetById(int id)
        {
            return new SuccessDataResult<User>(_userDal.Get(u => u.Id == id));
        }
        public IDataResult<User> GetByMail(string email)
        {
            return new SuccessDataResult<User>(_userDal.Get(u => u.Email == email));
        }

        public User GetByEmail(string email)
        {
            return _userDal.Get(u => u.Email == email);
        }

        public List<OperationClaim> GetClaims(User user)
        {
            return _userDal.GetClaims(user);
        }

        public IDataResult<UserDetailDto> GetUserDtoById(int id)
        {
            return new SuccessDataResult<UserDetailDto>(_userDal.GetUserDetails().Where(u => u.UserId == id).FirstOrDefault());
        }
        [ValidationAspect(typeof(UserValidator))]
        public IResult Update(User user)
        {
            var result = BusinessRules.Run(CheckIfUserExistsByMail(user));
            if (result != null)
            {
                return result;
            }

            _userDal.Update(user);
            return new SuccessResult(Messages.UpdatedSuccess);
        }

        public IDataResult<UserDetailDto> GetUserDtoByEmail(string email)
        {
            return new SuccessDataResult<UserDetailDto>(_userDal.GetUserDetails().Where(u => u.Email == email).FirstOrDefault());
        }
        private IResult CheckIfUserExistsByMail(User user)
        {
            var result = _userDal.GetList(u => u.Email == user.Email && u.Id != user.Id).Any();
            if (result)
            {
                return new ErrorResult(Messages.UserAlreadyExists);
            }
            return new SuccessResult();

        }
        public IResult UserIsCustomer(User user)
        {
            var result = _userOperationClaimService.GetByUserId(user.Id).Data;
            if (result.OperationClaimId == 2)
            {
                return new ErrorResult("Bu kullanıcı aynı zamanda bir müşteridir. Lütfen müşteri bölümünden siliniz.");
            }
            return new SuccessResult();
        }
    }
}
