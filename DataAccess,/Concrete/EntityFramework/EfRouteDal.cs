using Core.DataAccess.EntityFramework;
using DataAccess_.Abstract;
using Entities.Concrete;
using Entities.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess_.Concrete.EntityFramework
{
    public class EfRouteDal : EfEntityRepositoryBase<Route, Context>, IRouteDal
    {

        public List<RouteDto> GetAllTripDto(Expression<Func<RouteDto, bool>> filter = null)
        {
            using (Context context = new Context())
            {
                var result = from r in context.Routes
                             join t in context.Towns
                             on r.StartTownId equals t.Id
                             join t2 in context.Towns
                             on r.FinishTownId equals t2.Id
                             select new RouteDto
                             {
                                 Id = r.Id,
                                 StartTownName = t.TownName,
                                 FinishTownName = t2.TownName,
                                 Distance = r.Distance,


                             };
                return filter == null
              ? result.ToList()
              : result.Where(filter).ToList();

            }
        }
    }
}
