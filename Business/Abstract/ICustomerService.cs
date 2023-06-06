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
    public interface ICustomerService
    {
        IDataResult<List<Customer>> GetAll();
        IDataResult<Customer> GetById(int id);
        IDataResult<Customer> GetByUserId(int userId);
        IDataResult<Customer> GetByIdentityNumber(string identityNumber);
        IDataResult<Customer> GetByPhoneNumber(string phoneNumber);
        IDataResult<List<CustomerDto>> GetAllCustomerDto();
        IDataResult<CustomerDto> GetCustomerDtoById(int userId);
        IResult Add(CustomerAddDto customerAddDto);
        IResult Delete(Customer customer);
        IResult Update(CustomerAddDto customerAddDto);
    }
}
