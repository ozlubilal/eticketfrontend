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
    public class EfTicketDal : EfEntityRepositoryBase<Ticket, Context>, ITicketDal
    {
        public List<TicketDto> GetAllTripDto(Expression<Func<TicketDto, bool>> filter = null)
        {
            using (Context context = new Context())
            {
                var result = from t in context.Tickets
                             join tr in context.Trips
                             on t.TripId equals tr.Id
                             join r in context.Routes
                             on tr.RouteId equals r.Id
                             join g in context.Genders
                             on t.GenderId equals g.Id
                             join tw in context.Towns
                             on r.StartTownId equals tw.Id
                             join tw2 in context.Towns
                             on r.FinishTownId equals tw2.Id


                             select new TicketDto
                             {
                                 Id = t.Id,
                                 UserId = t.UserId,
                                 IdentityNumber = t.IdentityNumber,
                                 FirstName = t.FirstName,
                                 LastName = t.LastName,
                                 GenderName = g.GenderName,
                                 PhoneNumber = t.PhoneNumber,
                                 Email = t.Email,
                                 StartTownName = tw.TownName,
                                 FinishTownName = tw2.TownName,
                                 SeatNumber = t.SeatNumber,
                                 Date = tr.Date,
                                 Hour = tr.Hour,
                                 Price = tr.Price,
                             };
                return filter == null
                ? result.ToList()
                : result.Where(filter).ToList();

            }

        }
    }
}
