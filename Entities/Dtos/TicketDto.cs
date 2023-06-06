using Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.Dtos
{
    public class TicketDto : IDto
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string IdentityNumber { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string GenderName { get; set; }
        public string PhoneNumber { get; set; }
        public string Email { get; set; }
        public string StartTownName { get; set; }
        public string FinishTownName { get; set; }
        public int SeatNumber { get; set; }
        public DateTime Date { get; set; }
        public string Hour { get; set; }
        public decimal Price { get; set; }
    }
}
