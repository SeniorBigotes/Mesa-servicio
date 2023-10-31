package servicedesk.services;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import servicedesk.dto.TicketDto;
import servicedesk.entity.Ticket;
import servicedesk.repository.ITicketRep;

@Service
public class TicketService {

    @Autowired
    private ITicketRep ticketRepo;

    // Consulta de todos los tickets
    @Transactional(readOnly = true)
    public List<Ticket> findAll() {
        return ticketRepo.findAll();
    }

    // Consulta por Id
    public Ticket findById(Long id) {
        return (Ticket) ticketRepo.findById(id).orElse(null);
    }

    // Crear nuevo ticket
    public Ticket createTicket(TicketDto ticket) {
        Date fecha = new Date();
        Ticket ticketEntity = new Ticket();

        ticketEntity.setAsunto(ticket.getAsunto());
        ticketEntity.setEstatus("Abierto");
        ticketEntity.setFechaCreacion(fecha);
        ticketEntity.setUsuario(ticket.getUsuario());
        ticketEntity.setSeccion(ticket.getSeccion());
        ticketEntity.setCategoria(ticket.getCategoria());
        ticketEntity.setPrioridad(ticket.getPrioridad());

        return ticketRepo.save(ticketEntity);
    }

    // Update o Actualizar
    public Ticket update(TicketDto ticket, Long id) {
        Ticket ticketEntity = null;
        Date fecha = new Date();

        ticketEntity = ticketRepo.findById(id).orElse(null);

        if (ticketEntity == null) {
            return null;
        }
        // ticketEntity.setAsunto(ticket.getAsunto());
        ticketEntity.setDescripcionCambios(ticket.getDescripcionCambios());
        // ticketEntity.setEstatus(ticket.getEstatus());
        ticketEntity.setFechaModificacion(fecha);
        // ticketEntity.setFecha_creacion(fecha);
        // ticketEntity.setPersona(ticket.getPersona());
        // ticketEntity.setCategoria(ticket.getCategoria());
        ticketEntity.setPrioridad(ticket.getPrioridad());

        return ticketRepo.save(ticketEntity);
    }
}