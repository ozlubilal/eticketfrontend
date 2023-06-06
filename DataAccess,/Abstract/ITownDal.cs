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
    public interface ITownDal : IEntityRepository<Town>
    {
        List<TownDto> GetAllTownDto(Expression<Func<TownDto, bool>> filter = null);
    }
}
