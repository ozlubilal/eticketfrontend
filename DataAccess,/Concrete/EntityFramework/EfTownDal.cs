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
    public class EfTownDal : EfEntityRepositoryBase<Town, Context>, ITownDal
    {
        public List<TownDto> GetAllTownDto(Expression<Func<TownDto, bool>> filter = null)
        {
            using (Context context = new Context())
            {
                var result = from t in context.Towns
                             join c in context.Cities
                             on t.CityId equals c.Id
                             select new TownDto
                             {
                                 Id = t.Id,
                                 CityName = c.CityName,
                                 TownName = t.TownName,
                             };
                return filter == null
                  ? result.ToList()
                  : result.Where(filter).ToList();
            }
        }
    }
}
