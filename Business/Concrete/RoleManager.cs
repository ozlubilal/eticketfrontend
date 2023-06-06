using Business.Abstract;
using Business.Contants;
using Core.Utilities.Results;
using DataAccess_.Abstract;
using Entities.Concrete;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Concrete
{
    public class RoleManager : IRoleService
    {
        IRoleDal _roleDal;
        public RoleManager(IRoleDal roleDal)
        {
            _roleDal = roleDal;
        }

        public IResult Add(Role role)
        {
            _roleDal.Add(role);
            return new SuccessResult(Messages.AddedSuccess);
        }

        public IResult Delete(Role role)
        {
            _roleDal.Delete(role);
            return new SuccessResult(Messages.DeletedSuccess);
        }

        public IDataResult<List<Role>> GetAll()
        {
            return new SuccessDataResult<List<Role>>(_roleDal.GetList().ToList());
        }

        public IDataResult<Role> GetById(int id)
        {
            return new SuccessDataResult<Role>(_roleDal.Get(r => r.Id == id));
        }

        public IResult Update(Role role)
        {
            _roleDal.Update(role);
            return new SuccessResult(Messages.UpdatedSuccess);
        }
    }
}
