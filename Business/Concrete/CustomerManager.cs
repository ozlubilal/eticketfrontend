using Business.Abstract;
using Business.Contants;
using Business.ValidationRules.FluentValidation;
using Core.Aspects.Autofac.Validation;
using Core.Entities.Concrete;
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
    public class CustomerManager : ICustomerService
    {
        private ICustomerDal _customerDal;
        private IUserService _userService;
        private IAuthService _authService;
        private IUserOperationClaimService _userOperationClaimService;
        public CustomerManager(ICustomerDal customerDal, IUserService userService, IAuthService authService, IUserOperationClaimService userOperationClaimService)
        {
            _customerDal = customerDal;
            _userService = userService;
            _authService = authService;
            _userOperationClaimService = userOperationClaimService;
        }
        [ValidationAspect(typeof(CustomerValidator))]
        public IResult Add(CustomerAddDto customerAddDto)
        {
            var result = BusinessRules.Run(CheckIfIdentityNumberExists(customerAddDto), CheckIfPhoneNumberExists(customerAddDto), CheckIfEmailExists(customerAddDto));
            if (result != null)
            {
                return result;
            }

            UserForRegisterDto userForRegisterDto = new UserForRegisterDto
            {
                Email = customerAddDto.Email,
                Password = customerAddDto.Password,
                FirstName = customerAddDto.FirstName,
                LastName = customerAddDto.LastName,
                OperationClaimId = 2,
            };
            _authService.Register(userForRegisterDto, userForRegisterDto.Password);
            Customer customer = new Customer
            {
                UserId = _userService.GetByEmail(customerAddDto.Email).Id,
                IdentityNumber = customerAddDto.IdentityNumber,
                PhoneNumber = customerAddDto.PhoneNumber,
                GenderId = customerAddDto.GenderId,
            };

            _customerDal.Add(customer);
            return new SuccessResult(Messages.AddedSuccess);

        }

        public IResult Delete(Customer customer)
        {
            //silmek istediğimiz 'customer' aynı zamanda bir 'user' olduğu için bu kullanıcıyı da siliyoruz.
            User user = _userService.GetById(customer.UserId).Data;
            if (user != null)
            {
                _userService.Delete(user);
                UserOperationClaim userOperationClaim = _userOperationClaimService.GetByUserId(user.Id).Data;
            }
            _customerDal.Delete(customer);
            return new SuccessResult(Messages.DeletedSuccess);
        }

        public IDataResult<List<Customer>> GetAll()
        {
            return new SuccessDataResult<List<Customer>>(_customerDal.GetList());
        }

        public IDataResult<Customer> GetById(int id)
        {
            return new SuccessDataResult<Customer>(_customerDal.Get(r => r.Id == id));
        }

        public IDataResult<Customer> GetByIdentityNumber(string identityNumber)
        {
            return new SuccessDataResult<Customer>(_customerDal.Get(r => r.IdentityNumber == identityNumber));
        }


        public IDataResult<Customer> GetByPhoneNumber(string phoneNumber)
        {
            return new SuccessDataResult<Customer>(_customerDal.Get(r => r.PhoneNumber == phoneNumber));
        }

        public IDataResult<Customer> GetByUserId(int userId)
        {
            return new SuccessDataResult<Customer>(_customerDal.Get(r => r.UserId == userId));
        }
        public IDataResult<List<CustomerDto>> GetAllCustomerDto()
        {
            return new SuccessDataResult<List<CustomerDto>>(_customerDal.GetAllCustomerDto());
        }

        public IResult Update(CustomerAddDto customerAddDto)
        {
            var result = BusinessRules.Run(CheckIfIdentityNumberExists(customerAddDto), CheckIfPhoneNumberExists(customerAddDto), CheckIfEmailExists(customerAddDto));
            if (result != null)
            {
                return result;
            }
            Customer customer = _customerDal.Get(r => r.Id == customerAddDto.Id);
            User user = _userService.GetById(customer.UserId).Data;


            user.FirstName = customerAddDto.FirstName;
            user.LastName = customerAddDto.LastName;
            user.Email = customerAddDto.Email;
            _userService.Update(user);

            customer.IdentityNumber = customerAddDto.IdentityNumber;
            customer.PhoneNumber = customerAddDto.PhoneNumber;
            customer.GenderId = customerAddDto.GenderId;
            _customerDal.Update(customer);
            return new SuccessResult(Messages.userUpdated);

        }

        public IDataResult<CustomerDto> GetCustomerDtoById(int id)
        {
            return new SuccessDataResult<CustomerDto>(_customerDal.GetAllCustomerDto(r => r.Id == id).FirstOrDefault());
        }
        private IResult CheckIfIdentityNumberExists(CustomerAddDto customerAddDto)
        {
            var result = _customerDal.GetList(c => c.IdentityNumber == customerAddDto.IdentityNumber && c.Id != customerAddDto.Id).Any();
            if (result)
            {
                return new ErrorResult(Messages.customerAlreadyExistsByIdenityNumber);
            }
            return new SuccessResult();
        }
        private IResult CheckIfPhoneNumberExists(CustomerAddDto customerAddDto)
        {
            var result = _customerDal.GetList(c => c.PhoneNumber == customerAddDto.PhoneNumber && c.Id != customerAddDto.Id).Any();
            if (result)
            {
                return new ErrorResult(Messages.customerAlreadyExistsByPhoneNumber);
            }
            return new SuccessResult();
        }

        private IResult CheckIfEmailExists(CustomerAddDto customerAddDto)
        {
            var result = _userService.GetByMail(customerAddDto.Email).Data;
            //Güncelleme işleminde sorun olmaması için bu mail adresinde kullanıcı ya olmayacak ya da güncelleyeceğimiz mail adresine eşit olacak
            Customer customer = _customerDal.Get(c => c.Id == customerAddDto.Id);

            if (result == null || customer != null && result.Id == customer.UserId)
            {
                return new SuccessResult();
            }
            return new ErrorResult(Messages.UserAlreadyExists);
        }
    }
}
