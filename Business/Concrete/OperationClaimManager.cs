using Business.Abstract;
using Business.Contants;
using Core.Entities.Concrete;
using Core.Utilities.Business;
using Core.Utilities.Results;
using DataAccess_.Abstract;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Concrete
{
    public class OperationClaimManager : IOperationClaimService
    {
        IOperationClaimDal _operationClaimDal;
        public OperationClaimManager(IOperationClaimDal operationClaimDal)
        {
            _operationClaimDal = operationClaimDal;
        }
        public IResult Add(OperationClaim operationClaim)
        {
            IResult result = BusinessRules.Run(CheckIfOperationClaimNameExists(operationClaim));
            if (result != null)
            {
                return result;
            }
            _operationClaimDal.Add(operationClaim);
            return new SuccessResult(Messages.AddedSuccess);
        }

        public IResult Delete(OperationClaim operationClaim)
        {
            _operationClaimDal.Delete(operationClaim);
            return new SuccessResult(Messages.DeletedSuccess);
        }

        public IDataResult<List<OperationClaim>> GetAll()
        {
            return new SuccessDataResult<List<OperationClaim>>(_operationClaimDal.GetList());
        }

        public IDataResult<OperationClaim> GetById(int id)
        {
            return new SuccessDataResult<OperationClaim>(_operationClaimDal.GetList(o => o.Id == id).FirstOrDefault());

        }

        public IDataResult<List<OperationClaim>> GetByOperationClaimName(string operationClaimName)
        {
            return new SuccessDataResult<List<OperationClaim>>(_operationClaimDal.GetList(o => o.Name == operationClaimName));
        }
        public IResult Update(OperationClaim operationClaim)
        {
            IResult result = BusinessRules.Run(CheckIfOperationClaimNameExists(operationClaim));
            if (result != null)
            {
                return result;
            }
            _operationClaimDal.Update(operationClaim);
            return new SuccessResult(Messages.UpdatedSuccess);
        }
        private IResult CheckIfOperationClaimNameExists(OperationClaim operationClaim)
        {
            var result = _operationClaimDal.GetList(o => o.Name == operationClaim.Name && o.Id != operationClaim.Id).Any();
            if (result)
            {
                return new ErrorResult(Messages.OperationClaimNameNameAlreadyExist);
            }
            return new SuccessResult();
        }
    }
}
