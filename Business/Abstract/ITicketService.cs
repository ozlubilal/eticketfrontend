using Core.Utilities.Results;
using Entities.Concrete;
using Entities.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Abstract
{
    public interface ITicketService
    {
        IDataResult<List<Ticket>> GetAll();
        IDataResult<Ticket> GetById(int id);
        IDataResult<List<Ticket>> GetByUserId(int userId);
        IDataResult<List<Ticket>> GetByTripId(int tripId);
        IDataResult<List<TicketDto>> GetAllTicketDto();
        IDataResult<List<TicketDto>> GetTicketDtoByIdentityNumber(string identityNumber);
        IDataResult<List<int>> GetSeatNumberOfTripList(int tripId);
        IResult Add(Ticket ticket);
        IResult Delete(Ticket ticket);
        IResult Update(Ticket ticket);
    }
}
