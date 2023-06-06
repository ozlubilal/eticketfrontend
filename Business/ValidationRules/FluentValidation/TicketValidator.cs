using Entities.Concrete;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.ValidationRules.FluentValidation
{
    public class TicketValidator : AbstractValidator<Ticket>
    {
        public TicketValidator()
        {
            RuleFor(t => t.FirstName).NotEmpty();
            RuleFor(t => t.LastName).NotEmpty();
            RuleFor(t => t.PhoneNumber).NotEmpty();
            RuleFor(t => t.IdentityNumber).NotEmpty();
            RuleFor(t => t.SeatNumber).NotEmpty();
        }
    }
}

