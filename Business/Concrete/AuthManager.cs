using Business.Abstract;
using Business.Contants;
using Core.Entities.Concrete;
using Core.Utilities.Results;
using Core.Utilities.Security.Hashing;
using Core.Utilities.Security.JWT;
using Entities.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Concrete
{

    public class AuthManager : IAuthService
    {

        private IUserService _userService;
        private ITokenHelper _tokenHelper;
        private IOperationClaimService _operationClaimService;
        private IUserOperationClaimService _userOperationClaimService;

        public AuthManager(IUserService userService, ITokenHelper tokenHelper,
            IUserOperationClaimService userOperationClaimService, IOperationClaimService operationClaimService)
        {
            _userService = userService;
            _tokenHelper = tokenHelper;
            _userOperationClaimService = userOperationClaimService;
            _operationClaimService = operationClaimService;
        }

        public IDataResult<AccessToken> CreateAccessToken(User user)
        {
            var claims = _userService.GetClaims(user);
            var accessToken = _tokenHelper.CreateToken(user, claims);
            return new SuccessDataResult<AccessToken>(accessToken, Messages.AccesTokenCreated);
        }

        public IDataResult<User> Login(UserForLoginDto userForLoginDto)
        {
            var userToCheck = _userService.GetByEmail(userForLoginDto.Email);
            if (userToCheck == null)
            {
                return new ErrorDataResult<User>(Messages.UserNotFound);
            }
            if (!HashingHelper.VerifyPasswordHash(userForLoginDto.Password, userToCheck.PasswordHash, userToCheck.PasswordSalt))
            {
                return new ErrorDataResult<User>(Messages.PasswordError);
            }
            return new SuccessDataResult<User>(userToCheck, Messages.UserSuccesfulLogin);
        }

        public IDataResult<User> Register(UserForRegisterDto userForRegisterDto, string password)
        {
            byte[] passwordHash, passwordSalt;
            HashingHelper.CreatePasswordHash(password, out passwordHash, out passwordSalt);
            var user = new User
            {
                Email = userForRegisterDto.Email,
                FirstName = userForRegisterDto.FirstName,
                LastName = userForRegisterDto.LastName,
                PasswordHash = passwordHash,
                PasswordSalt = passwordSalt,
                Status = true
            };
            _userService.Add(user);
            var userOperationClaim = new UserOperationClaim
            {
                OperationClaimId = userForRegisterDto.OperationClaimId,
                UserId = user.Id,
            };
            if (userForRegisterDto.OperationClaimId == null || userForRegisterDto.OperationClaimId == 0)
            {
                userOperationClaim.OperationClaimId = 2;
            }
            _userOperationClaimService.Add(userOperationClaim);
            return new SuccessDataResult<User>(user, Messages.UserRegistered);
        }
        public IDataResult<User> Update(UserForUpdateDto userForUpdateDto, string password)
        {

            byte[] passwordHash, passwordSalt;
            HashingHelper.CreatePasswordHash(password, out passwordHash, out passwordSalt);

            var user = new User
            {
                Id = userForUpdateDto.UserId,
                Email = userForUpdateDto.Email,
                FirstName = userForUpdateDto.FirstName,
                LastName = userForUpdateDto.LastName,
                PasswordHash = passwordHash,
                PasswordSalt = passwordSalt,
                Status = true
            };
            // _userService.Update(user);

            var userOperationClaim = _userOperationClaimService.GetByUserId(userForUpdateDto.UserId).Data;
            userOperationClaim.OperationClaimId = userForUpdateDto.OperationClaimId;
            _userOperationClaimService.Update(userOperationClaim);
            return new SuccessDataResult<User>(user, Messages.userUpdated);


            //var customer = new Customer
            //{
            //    Id = _customerService.GetByIdentityNumber(userForUpdateDto.IdentityNumber).Data.Id,
            //    PhoneNumber = userForUpdateDto.PhoneNumber,
            //    IdentityNumber = userForUpdateDto.IdentityNumber,
            //    GenderId = userForUpdateDto.GenderId,
            //    UserId = userForUpdateDto.UserId,

            //};
            //_customerService.Update(customer);
        }


        public IResult UserExists(string email)
        {
            if (_userService.GetByEmail(email) != null)
            {
                return new ErrorResult(Messages.UserAlreadyExists);
            }
            return new SuccessResult();
        }
    }
}
