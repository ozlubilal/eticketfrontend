using Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.Concrete
{
    public class Route : IEntity
    {
        public int Id { get; set; }
        public int StartTownId { get; set; }
        public int FinishTownId { get; set; }
        public int Distance { get; set; }
    }
}
