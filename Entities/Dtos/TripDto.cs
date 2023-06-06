using Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.Dtos
{
    public class TripDto : IDto
    {
        public int Id { get; set; }
        public int BusTypeId { get; set; }
        public string StartTownName { get; set; }
        public string FinishTownName { get; set; }
        public int NumberOfSeats { get; set; }
        public DateTime Date { get; set; }
        public string Hour { get; set; }
        public decimal Price { get; set; }


    }
}
