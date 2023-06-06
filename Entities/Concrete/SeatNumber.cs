using Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.Concrete
{
    public class SeatNumber : IEntity
    {
        public int Id { get; set; }
        public int TripId { get; set; }
        public string Number { get; set; }
        public int GenderId { get; set; }

    }
}
