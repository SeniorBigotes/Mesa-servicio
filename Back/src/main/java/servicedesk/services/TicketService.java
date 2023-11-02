package servicedesk.services;

import java.util.Collections;
import java.util.Comparator;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
public class TicketService {

    @Autowired private ITicketRep ticketRepo;
    @Autowired private ISeccionRep seccionRep;
    @Autowired private ICategoriaRep categoriaRep;
    @Autowired private IPrioridadRep prioridadRep;

    // Consulta de todos los tickets
    @Transactional(readOnly = true)
    public List<Ticket> findAllTicket() {
        List<Ticket> lista = ticketRepo.findAll();

        // Ordenar la lista de forma descendente por 'id'
        Collections.sort(lista, Comparator.comparing(Ticket::getId).reversed());

        // Mover los elementos con fecha de modificación al principio
        // Collections.sort(lista, (a, b) -> {
        //     if (a.getFechaModificacion() != null && b.getFechaModificacion() == null) {
        //         return -1; // a antes que b (a tiene fecha de modificación, b no)
        //     } else if (a.getFechaModificacion() == null && b.getFechaModificacion() != null) {
        //         return 1; // b antes que a (b tiene fecha de modificación, a no)
        //     } else {
        //         return 0; // Igual (ambos tienen fecha de modificación o ninguno la tiene)
        //     }
        // });

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
        Date fecha = new Date();
        Ticket ticketEntity = new Ticket();

        ticketEntity.setAsunto(ticket.getAsunto());
        ticketEntity.setEstatus(EstatusTicket.ABIERTO);
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
        ticketEntity.setEstatus(EstatusTicket.EN_PROCESO);
        ticketEntity.setDescripcionCambios(ticket.getDescripcionCambios());
        // ticketEntity.setEstatus(ticket.getEstatus());
        ticketEntity.setFechaModificacion(fecha);
        // ticketEntity.setFecha_creacion(fecha);
        // ticketEntity.setPersona(ticket.getPersona());
        // ticketEntity.setCategoria(ticket.getCategoria());
        ticketEntity.setPrioridad(ticket.getPrioridad());

        if(ticket.getEstatus() == EstatusTicket.CERRADO) {
            ticketEntity.setEstatus(EstatusTicket.CERRADO);
        } else if(ticket.getEstatus() == EstatusTicket.EN_PROCESO) {
            ticketEntity.setEstatus(EstatusTicket.EN_PROCESO);
        }
        
        return ticketRepo.save(ticketEntity);
    }
}