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
    public interface ITripDal : IEntityRepository<Trip>
    {
        List<TripDto> GetAllTripDto(Expression<Func<TripDto, bool>> filter = null);
    }
}
