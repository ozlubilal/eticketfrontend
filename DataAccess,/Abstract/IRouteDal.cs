using Core.DataAccess;
using Entities.Concrete;
using Entities.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess_.Abstract
{

    public interface IRouteDal : IEntityRepository<Route>
    {
        List<RouteDto> GetAllTripDto(Expression<Func<RouteDto, bool>> filter = null);
    }
}
