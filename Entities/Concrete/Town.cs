using Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.Concrete
{
    public class Town : IEntity
    {
        public int Id { get; set; }
        public string TownName { get; set; }
        public int CityId { get; set; }
    }
}
