using Core.DataAccess.EntityFramework;
using DataAccess_.Abstract;
using Entities.Concrete;
using Entities.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess_.Concrete.EntityFramework
{
    public class EfCustomerDal : EfEntityRepositoryBase<Customer, Context>, ICustomerDal
    {
        public List<CustomerDto> GetAllCustomerDto(Expression<Func<CustomerDto, bool>> filter = null)
        {
            using (Context context = new Context())
            {
                var result = from c in context.Customers
                             join u in context.Users
                             on c.UserId equals u.Id
                             join g in context.Genders
                             on c.GenderId equals g.Id
                             select new CustomerDto
                             {
                                 Id = c.Id,
                                 IdentityNumber = c.IdentityNumber,
                                 FirstName = u.FirstName,
                                 LastName = u.LastName,
                                 PhoneNumber = c.PhoneNumber,
                                 Email = u.Email,
                                 GenderName = g.GenderName,
                             };
                return filter == null
               ? result.ToList()
               : result.Where(filter).ToList();



            }
        }
        public List<CustomerAddDto> GetAllCustomerAddDto(Expression<Func<CustomerAddDto, bool>> filter = null)
        {
            using (Context context = new Context())
            {
                var result = from c in context.Customers
                             join u in context.Users
                             on c.UserId equals u.Id
                             join g in context.Genders
                             on c.GenderId equals g.Id
                             select new CustomerAddDto
                             {
                                 Id = c.Id,
                                 IdentityNumber = c.IdentityNumber,
                                 FirstName = u.FirstName,
                                 LastName = u.LastName,
                                 PhoneNumber = c.PhoneNumber,
                                 Email = u.Email,
                                 GenderId = g.Id,
                             };
                return filter == null
               ? result.ToList()
               : result.Where(filter).ToList();



            }
        }
    }
}
