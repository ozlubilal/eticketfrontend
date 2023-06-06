using Entities.Concrete;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.ValidationRules.FluentValidation
{
    public class RouteValidator : AbstractValidator<Route>
    {
        public RouteValidator()
        {
            RuleFor(r => r.StartTownId).NotEmpty();
            RuleFor(r => r.FinishTownId).NotEmpty();
            RuleFor(r => r.Distance).NotEmpty();

        }
    }
}
