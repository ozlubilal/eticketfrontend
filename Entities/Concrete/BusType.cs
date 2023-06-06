using Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.Concrete
{
    public class BusType:IEntity
    {
        public int Id { get; set; }
        public string BusTypeName { get; set; }
        public int NumberOfSeats { get; set; }
    }
}
