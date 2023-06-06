using Core.DataAccess.EntityFramework;
using Core.Entities.Concrete;
using DataAccess_.Abstract;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess_.Concrete.EntityFramework
{

    public class EfOperationClaimDal : EfEntityRepositoryBase<OperationClaim, Context>, IOperationClaimDal
    {

    }
}
