using Entities.Concrete;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.ValidationRules.FluentValidation
{
    public class TripValidator : AbstractValidator<Trip>
    {
        public TripValidator()
        {
            RuleFor(t => t.BusTypeId).NotEmpty();
            RuleFor(t => t.Date).NotEmpty();
            RuleFor(t => t.Hour).NotEmpty();
            RuleFor(t => t.RouteId).NotEmpty();
            RuleFor(t => t.Price).NotEmpty();
        }
    }
}
