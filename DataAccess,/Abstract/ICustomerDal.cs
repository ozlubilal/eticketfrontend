using Core.DataAccess;
using Entities.Concrete;
using Entities.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess_.Abstract
{
    public interface ICustomerDal : IEntityRepository<Customer>
    {
        List<CustomerDto> GetAllCustomerDto(Expression<Func<CustomerDto, bool>> filter = null);
        List<CustomerAddDto> GetAllCustomerAddDto(Expression<Func<CustomerAddDto, bool>> filter = null);
    }
}
