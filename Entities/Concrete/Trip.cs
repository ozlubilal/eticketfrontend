using Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.Concrete
{
    public class Trip:IEntity
    {
        public int Id { get; set; }
        public int RouteId { get; set; }
        public int BusTypeId { get; set; }
        public DateTime Date { get; set; }
        public string Hour { get; set; }
        public int Price { get; set; }
        public int StateId { get; set; }
    }
}
