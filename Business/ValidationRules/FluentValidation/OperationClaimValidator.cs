using Entities.Concrete;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.ValidationRules.FluentValidation
{
    public class OperationClaimValidator : AbstractValidator<Role>
    {
        public OperationClaimValidator()
        {
            RuleFor(o => o.RoleName).NotEmpty();
        }

    }
}

