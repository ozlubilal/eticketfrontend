using Core.Utilities.Results;
using Entities.Concrete;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Abstract
{
    public interface ITripStateService
    {
        IDataResult<List<TripState>> GetAll();
        IDataResult<TripState> GetById(int id);
        IResult Add(TripState tripState);
        IResult Delete(TripState tripState);
        IResult Update(TripState tripState);
    }
}
