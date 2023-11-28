package servicedesk.dto;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import servicedesk.entity.ticket.Prioridad;
import servicedesk.entity.ticket.Ticket;
import servicedesk.entity.usuario.Cuenta;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegistroDto {

    private Long id;
    private String cambios;
    private String estatus;
    private Date fecha;
    private Prioridad prioridad;
    private Cuenta modifico;
    private Ticket ticket;
}
