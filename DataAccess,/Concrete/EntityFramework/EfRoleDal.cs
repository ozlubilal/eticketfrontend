using Core.DataAccess.EntityFramework;
using DataAccess_.Abstract;
using Entities.Concrete;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess_.Concrete.EntityFramework
{
    public class EfRoleDal : EfEntityRepositoryBase<Role, Context>, IRoleDal
    {
    }
}
