package servicedesk.services;

import java.util.Collections;
import java.util.Comparator;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.AllArgsConstructor;
import servicedesk.dto.TicketDto;
import servicedesk.entity.ticket.Categoria;
import servicedesk.entity.ticket.EstatusTicket;
import servicedesk.entity.ticket.Prioridad;
import servicedesk.entity.ticket.Seccion;
import servicedesk.entity.ticket.Ticket;
import servicedesk.repository.ICategoriaRep;
import servicedesk.repository.IPrioridadRep;
import servicedesk.repository.ISeccionRep;
import servicedesk.repository.ITicketRep;

@Service
@AllArgsConstructor
public class TicketService {

    @Autowired
    private final ITicketRep ticketRepo;
    @Autowired
    private final ISeccionRep seccionRep;
    @Autowired
    private final ICategoriaRep categoriaRep;
    @Autowired
    private final IPrioridadRep prioridadRep;

    // Consulta de todos los tickets
    @Transactional(readOnly = true)
    public List<Ticket> findAllTicket() {
        // Obtén la lista de tickets desde el repositorio
        List<Ticket> lista = ticketRepo.findAll();

        // Ordena la lista por ID de forma descendente
        Collections.sort(lista, Comparator.comparingLong(Ticket::getId).reversed());

        return lista;
    }

    // Consultar secciones
    public List<Seccion> findAllSeccion() {
        return seccionRep.findAll();
    }

    // Consultar todas las categorias
    public List<Categoria> findAllCategorias() {
        return categoriaRep.findAll();
    }

    // Consultar todas las prioridades
    public List<Prioridad> findAllPrioridad() {
        return prioridadRep.findAll();
    }

    // Consulta ticket por Id
    public Ticket findById(Long id) {
        return (Ticket) ticketRepo.findById(id).orElse(null);
    }

    // Crear nuevo ticket
    public Ticket createTicket(TicketDto ticket) {
        final Date fecha = new Date();
        final Ticket ticketEntity = new Ticket();

        ticketEntity.setAsunto(ticket.getAsunto());
        ticketEntity.setDescripcionCambios("");
        ticketEntity.setEstatus(EstatusTicket.ABIERTO);
        ticketEntity.setFechaCreacion(fecha);
        ticketEntity.setAutor(ticket.getAutor());
        ticketEntity.setSeccion(ticket.getSeccion());
        ticketEntity.setCategoria(ticket.getCategoria());
        ticketEntity.setPrioridad(ticket.getPrioridad());

        return ticketRepo.save(ticketEntity);
    }

    // Update o Actualizar
    public Ticket update(TicketDto ticket, Long id) {
        Ticket ticketEntity = null;
        final Date fecha = new Date();

        ticketEntity = ticketRepo.findById(id).orElse(null);

        if (ticketEntity == null) {
            return null;
        }

        // ticketEntity.setAsunto(ticket.getAsunto());
        ticketEntity.setEstatus(EstatusTicket.EN_PROCESO);
        ticketEntity.setDescripcionCambios(ticket.getDescripcionCambios());
        // ticketEntity.setEstatus(ticket.getEstatus());
        ticketEntity.setFechaModificacion(fecha);
        // ticketEntity.setFecha_creacion(fecha);
        // ticketEntity.setPersona(ticket.getPersona());
        // ticketEntity.setCategoria(ticket.getCategoria());
        ticketEntity.setPrioridad(ticket.getPrioridad());

        if (ticket.getEstatus() == EstatusTicket.CERRADO) {
            ticketEntity.setEstatus(EstatusTicket.CERRADO);
        }

        return ticketRepo.save(ticketEntity);
    }
}