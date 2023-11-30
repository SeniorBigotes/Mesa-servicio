package servicedesk.services;

import java.util.Collections;
import java.util.Comparator;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.AllArgsConstructor;
import servicedesk.dto.RegistroDto;
import servicedesk.dto.TicketDto;
import servicedesk.entity.ticket.Categoria;
import servicedesk.entity.ticket.EstatusTicket;
import servicedesk.entity.ticket.Prioridad;
import servicedesk.entity.ticket.Registro;
import servicedesk.entity.ticket.Seccion;
import servicedesk.entity.ticket.Ticket;
import servicedesk.repository.ICategoriaRep;
import servicedesk.repository.IPrioridadRep;
import servicedesk.repository.IRegistroRep;
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
    @Autowired
    private final IRegistroRep registroRep;

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
        List<Seccion> list = seccionRep.findAll();
        Collections.sort(list, Comparator.comparing(Seccion::getSeccion));
        return list;
    }

    // Consultar todas las categorias
    public List<Categoria> findAllCategorias() {
        List<Categoria> list = categoriaRep.findAll();
        Collections.sort(list, Comparator.comparing(Categoria::getCategoria));
        return list;
    }

    // Consultar todas las prioridades
    public List<Prioridad> findAllPrioridad() {
        List<Prioridad> list = prioridadRep.findAll();
        Collections.sort(list, Comparator.comparingLong(Prioridad::getId).reversed());
        return list;
    }

    // Consulta ticket por Id
    public Ticket findById(Long id) {
        return (Ticket) ticketRepo.findById(id).orElse(null);
    }

    // Consulta de todos los registros
    @Transactional(readOnly = true)
    public List<Registro> reporteFindAll() {
        List<Registro> registros =  registroRep.findAll();
        Collections.sort(registros, Comparator.comparingLong(Registro::getId).reversed());
        return registros;
    }

    // Consulta por Id
    public Registro reporteFindById(Long id) {
        return registroRep.findById(id).orElse(null);
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
        ticketEntity.setAsignado(ticket.getAsignado());

        // asignar prioridades dependiendo la categoria
        if(ticket.getPrioridad() == null) {
            Prioridad prioridad;
            prioridad = ticket.getCategoria().getId().equals(2L) || ticket.getCategoria().getId().equals(4L) ?
                prioridadRep.findById(2L).orElse(null) : prioridadRep.findById(3L).orElse(null);
            ticketEntity.setPrioridad(prioridad);
        } else {
            ticketEntity.setPrioridad(ticket.getPrioridad());
        }

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
        ticketEntity.setAsignado(ticket.getAsignado());
        
        if(ticket.getPrioridad() != null) {
            ticketEntity.setPrioridad(ticket.getPrioridad());
        }
        if (ticket.getEstatus() == EstatusTicket.CERRADO) {
            ticketEntity.setEstatus(EstatusTicket.CERRADO);
        }

        return ticketRepo.save(ticketEntity);
    }

    // Crear nuevo reporte
    public Registro crearReporte(RegistroDto registro) {
        Date fecha = new Date();
        Registro registroEntity = new Registro();

        registroEntity.setModifico(registro.getModifico());
        registroEntity.setTicket(registro.getTicket());
        registroEntity.setFecha(fecha);
        registroEntity.setCambios(registro.getCambios());
        registroEntity.setEstatus(registro.getEstatus());
        registroEntity.setPrioridad(registro.getPrioridad());

        return registroRep.save(registroEntity);
    }
}