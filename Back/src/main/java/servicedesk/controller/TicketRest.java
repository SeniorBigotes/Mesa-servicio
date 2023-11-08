package servicedesk.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import servicedesk.dto.TicketDto;
import servicedesk.entity.ticket.Categoria;
import servicedesk.entity.ticket.Prioridad;
import servicedesk.entity.ticket.Seccion;
import servicedesk.entity.ticket.Ticket;
import servicedesk.services.TicketService;

@RestController
@RequestMapping("/api")
public class TicketRest {

    @Autowired
    private TicketService ticketservice;

    // Buscar todos los tickets
    @CrossOrigin
    @GetMapping("/tickets")
    @ResponseStatus(HttpStatus.OK)
    public List<Ticket> consulta() {
        return ticketservice.findAllTicket();
    }
    
    @GetMapping("/secciones")
    @ResponseStatus(HttpStatus.OK)
    public List<Seccion> consultaSeccion() {
        return ticketservice.findAllSeccion();
    }

    @GetMapping("/categorias")
    @ResponseStatus(HttpStatus.OK)
    public List<Categoria> consultaCategorias() {
        return ticketservice.findAllCategorias();
    }

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
        } catch (DataAccessException e) {
            response.put("mensaje", "Error al realizar el insert");
            response.put("error", e.getMessage().concat(e.getMostSpecificCause().getLocalizedMessage()));
            return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        response.put("mensaje", "Ticket creado con exito");
        response.put("ticket", ticketNew);
        return new ResponseEntity<Map<String, Object>>(response, HttpStatus.OK);
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
}
