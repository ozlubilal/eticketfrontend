using Entities.Dtos;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.ValidationRules.FluentValidation
{
    public class CustomerValidator : AbstractValidator<CustomerAddDto>
    {
        public CustomerValidator()
        {
            RuleFor(c => c.IdentityNumber).MaximumLength(9);
            RuleFor(c => c.PhoneNumber).NotEmpty();
        }
    }
}
