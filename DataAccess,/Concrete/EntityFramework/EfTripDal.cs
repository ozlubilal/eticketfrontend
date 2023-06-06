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
    public class EfTripDal : EfEntityRepositoryBase<Trip, Context>, ITripDal
    {
        public List<TripDto> GetAllTripDto(Expression<Func<TripDto, bool>> filter = null)
        {
            using (Context context = new Context())
            {
                var result = from t in context.Trips
                             join b in context.BusTypes
                             on t.BusTypeId equals b.Id
                             join r in context.Routes
                             on t.RouteId equals r.Id
                             join tw in context.Towns
                             on r.StartTownId equals tw.Id
                             join tw2 in context.Towns
                             on r.FinishTownId equals tw2.Id
                             select new TripDto
                             {
                                 Id = t.Id,
                                 BusTypeId = t.BusTypeId,
                                 StartTownName = tw.TownName,
                                 FinishTownName = tw2.TownName,
                                 NumberOfSeats = b.NumberOfSeats,
                                 Date = t.Date,
                                 Hour = t.Hour,
                                 Price = t.Price,
                             };
                return filter == null
                   ? result.ToList()
                   : result.Where(filter).ToList();



            }
        }
    }
}
