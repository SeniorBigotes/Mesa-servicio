package servicedesk.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import lombok.AllArgsConstructor;
import servicedesk.dto.RegistroDto;
import servicedesk.dto.TicketDto;
import servicedesk.entity.ticket.Categoria;
import servicedesk.entity.ticket.Prioridad;
import servicedesk.entity.ticket.Registro;
import servicedesk.entity.ticket.Seccion;
import servicedesk.entity.ticket.Ticket;
import servicedesk.services.TicketService;

@RestController
@AllArgsConstructor
@RequestMapping("/api")
public class TicketRest {

    @Autowired
    private final TicketService ticketservice;

    /* GET TICKETS */
    // Buscar todos los tickets
    @GetMapping("/tickets")
    @ResponseStatus(HttpStatus.OK)
    public List<Ticket> consulta() {
        return ticketservice.findAllTicket();
    }
    // Consultar tickets de seccion que no tengan asignado
    @GetMapping("/tickets/no_asignados/{id}")
    @ResponseStatus(HttpStatus.OK)
    public List<Ticket> consultaTicketSinAsignar(@PathVariable Long id) {
        List<Ticket> ticket = new ArrayList<>();
        ticket = ticketservice.ticketsSinAsignar(id);
        
        if (ticket == null) {
            return null;
        }
        return ticket;
    }
    // Consultar mis tickets
    @GetMapping("/tickets/mis_tickets/{seccion}/{user}")
    @ResponseStatus(HttpStatus.OK)
    public List<Ticket> consultaMisTicketsActivos(@PathVariable Long seccion, @PathVariable Long user) {
        List<Ticket> ticket = new ArrayList<>();
        ticket = ticketservice.ticketsSeccionActivos(seccion, user);
        
        if (ticket == null) {
            return null;
        }
        return ticket;
    }
    // Consultar tickets cerrados
    @GetMapping("/tickets/cerrados/{seccion}/{user}")
    @ResponseStatus(HttpStatus.OK)
    public List<Ticket> consultaMisTicketsCerrados(@PathVariable Long seccion, @PathVariable Long user) {
        List<Ticket> ticket = new ArrayList<>();
        ticket = ticketservice.ticketsSeccionInactivos(seccion, user);
        
        if (ticket == null) {
            return null;
        }
        return ticket;
    }

    /* Consultar todo */
    // secciones
    @GetMapping("/secciones")
    @ResponseStatus(HttpStatus.OK)
    public List<Seccion> consultaSeccion() {
        return ticketservice.findAllSeccion();
    }
    //categorias
    @GetMapping("/categorias")
    @ResponseStatus(HttpStatus.OK)
    public List<Categoria> consultaCategorias() {
        return ticketservice.findAllCategorias();
    }
    // prioridades
    @GetMapping("/prioridades")
    @ResponseStatus(HttpStatus.OK)
    public List<Prioridad> consultaPrioridad() {
        return ticketservice.findAllPrioridad();
    }

    // Buscar ticket por ID
    @GetMapping("/tickets/{id}")
    public ResponseEntity<?> consultaPorID(@PathVariable Long id) {
        Ticket ticket = null;
        String response = "";

        try {
            ticket = ticketservice.findById(id);
        } catch (DataAccessException e) {
            response = "Error al realizar la consulta";
            response = response.concat(e.getMessage().concat(e.getMostSpecificCause().toString()));
            return new ResponseEntity<String>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        if (ticket == null) {
            response = "El ticket con el ID: ".concat(id.toString()).concat("no existe en la base de datos");
            return new ResponseEntity<String>(response, HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<Ticket>(ticket, HttpStatus.OK);
    }

    // Agreagr ticket
    @PostMapping("/tickets")
    public ResponseEntity<?> create(@RequestBody TicketDto ticket) {
        Ticket ticketNew = null;
        Map<String, Object> response = new HashMap<>();
        try {
            ticketNew = this.ticketservice.createTicket(ticket);

            response.put("mensaje", "Ticket creado con exito");
            response.put("ticket", ticketNew);
            return new ResponseEntity<Map<String, Object>>(response, HttpStatus.CREATED);

        } catch (DataAccessException e) {
            response.put("mensaje", "Error al realizar el insert");
            response.put("error", e.getMessage().concat(e.getMostSpecificCause().getLocalizedMessage()));
            return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Actualizar ticket
    @PutMapping("/tickets/{id}")
    public ResponseEntity<?> update(@RequestBody TicketDto actualizarTicket, @PathVariable Long id) {
        Ticket actualizarticket = null;
        Map<String, Object> response = new HashMap<>();
        try {
            actualizarticket = this.ticketservice.update(actualizarTicket, id);
            if (actualizarticket == null) {
                response.put("Error", " no existe en la base de datos");
                return new ResponseEntity<Map<String, Object>>(response, HttpStatus.NOT_FOUND);
            }
        } catch (DataAccessException e) {
            response.put("mensaje", "Error al actualizar");
            response.put("error", e.getMessage().concat(e.getMostSpecificCause().getLocalizedMessage()));
            return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        response.put("mensaje", "Ticket actualizado con exito");
        response.put("Ticket", actualizarticket);
        return new ResponseEntity<Map<String, Object>>(response, HttpStatus.OK);
    }

    // Ver todos los registros
    @GetMapping("/registros")
    @ResponseStatus(HttpStatus.OK)
    public List<Registro> consultaRegistros() {
        return ticketservice.registroFindAll();
    }
    
    // Ver todos los registros (ordenado por id del ticket)
    @GetMapping("/registros/ticket")
    @ResponseStatus(HttpStatus.OK)
    public List<Registro> consultaRegistrosTicket() {
        List<Registro> list = ticketservice.registroFindAll();
        Collections.sort(list, Comparator.comparingLong(registro -> ((Registro) registro).getTicket().getId()).reversed());
        return list;
    }
    // Ver registros por ID
    @GetMapping("/registros/{id}")
    public ResponseEntity<?> consultaRegistroPorID(@PathVariable Long id) {
        Registro registros = null;
        String response = "";

        try {
            registros = ticketservice.registroFindById(id);

            if (registros == null) {
                response = "El registro con el ID: ".concat(id.toString()).concat("no existe en la base de datos");
                return new ResponseEntity<String>(response, HttpStatus.NOT_FOUND);
            }
            return new ResponseEntity<Registro>(registros, HttpStatus.OK);
        } catch (DataAccessException e) {
            response = "Error al realizar la consulta";
            response = response.concat(e.getMessage().concat(e.getMostSpecificCause().toString()));
            return new ResponseEntity<String>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Crear reportes
    @PostMapping("/registros")
    public ResponseEntity<?> create(@RequestBody RegistroDto registro) {
        Registro registroNew = null;
        Map<String, Object> response = new HashMap<>();

        try {
            registroNew = ticketservice.crearRegistro(registro);

            response.put("mensaje", "Registro  creado con exito");
            response.put("registro", registroNew);
            return new ResponseEntity<Map<String, Object>>(response, HttpStatus.CREATED);
        } catch (DataAccessException e) {
            response.put("mensaje", "Error al realizar el insert");
            response.put("error", e.getMessage().concat(e.getMostSpecificCause().getLocalizedMessage()));
            return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}