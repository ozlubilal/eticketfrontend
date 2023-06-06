using Entities.Concrete;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.ValidationRules.FluentValidation
{
    public class BusTypeValidator : AbstractValidator<BusType>
    {
        public BusTypeValidator()
        {
            RuleFor(b => b.BusTypeName).NotEmpty().Length(2, 5);
            RuleFor(b => b.NumberOfSeats).NotEqual(0).NotEmpty();
        }
    }
}
