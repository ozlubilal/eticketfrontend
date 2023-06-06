using Core.Utilities.Results;
using Entities.Concrete;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Abstract
{
    public interface IBusTypeService
    {
        IDataResult<List<BusType>> GetAll();
        IDataResult<BusType> GetById(int id);
        IResult Add(BusType busType);
        IResult Delete(BusType busType);
        IResult Update(BusType busType);
    }
}
