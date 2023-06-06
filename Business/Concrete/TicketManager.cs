using Business.Abstract;
using Business.Contants;
using Business.ValidationRules.FluentValidation;
using Core.Aspects.Autofac.Validation;
using Core.Utilities.Business;
using Core.Utilities.Results;
using DataAccess_.Abstract;
using Entities.Concrete;
using Entities.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Concrete
{
    public class TicketManager : ITicketService
    {
        ITicketDal _ticketDal;
        public TicketManager(ITicketDal ticketDal)
        {
            _ticketDal = ticketDal;
        }
        [ValidationAspect(typeof(TicketValidator))]
        public IResult Add(Ticket ticket)
        {
            var result = BusinessRules.Run(CheckIfSeatNumberEmpty(ticket));
            if (result != null)
            {
                return result;
            }
            _ticketDal.Add(ticket);
            return new SuccessResult(Messages.AddedSuccess);
        }

        public IResult Delete(Ticket ticket)
        {
            _ticketDal.Delete(ticket);
            return new SuccessResult(Messages.DeletedSuccess);
        }

        public IDataResult<List<Ticket>> GetAll()
        {
            return new SuccessDataResult<List<Ticket>>(_ticketDal.GetList().ToList());
        }

        public IDataResult<List<Ticket>> GetByUserId(int userId)
        {
            return new SuccessDataResult<List<Ticket>>(_ticketDal.GetList(t => t.UserId == userId).ToList());
        }

        public IDataResult<Ticket> GetById(int id)
        {
            return new SuccessDataResult<Ticket>(_ticketDal.Get(t => t.Id == id));
        }

        public IDataResult<List<Ticket>> GetByTripId(int tripId)
        {
            return new SuccessDataResult<List<Ticket>>(_ticketDal.GetList(t => t.TripId == tripId));
        }
        public IDataResult<List<TicketDto>> GetAllTicketDto()
        {
            return new SuccessDataResult<List<TicketDto>>(_ticketDal.GetAllTripDto().ToList());
        }

        public IDataResult<List<TicketDto>> GetTicketDtoByIdentityNumber(string identityNumber)
        {
            return new SuccessDataResult<List<TicketDto>>(_ticketDal.GetAllTripDto(t => t.IdentityNumber == identityNumber).ToList());
        }
        [ValidationAspect(typeof(TicketValidator))]
        public IResult Update(Ticket ticket)
        {
            _ticketDal.Update(ticket);
            return new SuccessResult(Messages.UpdatedSuccess);
        }

        //sefer ait dolu koltuk numaraları alınıyor
        public IDataResult<List<int>> GetSeatNumberOfTripList(int tripId)
        {
            //seçilen sefere ait bilet listesi alınıyor
            var ticketList = GetByTripId(tripId).Data;
            List<int> seatNumberOfTripList = new List<int>();
            //bilet listesindeki koltuk numaraları listesi oluşturuluyor
            foreach (var item in ticketList)
            {
                seatNumberOfTripList.Add(_ticketDal.Get(t => t.Id == item.Id).SeatNumber);
            }
            return new SuccessDataResult<List<int>>(seatNumberOfTripList);

        }
        private IResult CheckIfSeatNumberEmpty(Ticket ticket)
        {
            var result = _ticketDal.GetList(t => t.TripId == ticket.TripId && t.SeatNumber == ticket.SeatNumber && t.Id != ticket.Id).Any();
            if (result)
            {
                return new ErrorResult(Messages.SeatNumberNotEmpty);
            }
            return new SuccessResult();
        }
    }
}
