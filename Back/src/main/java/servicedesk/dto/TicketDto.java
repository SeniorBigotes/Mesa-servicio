package servicedesk.dto;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import servicedesk.entity.ticket.Categoria;
import servicedesk.entity.ticket.EstatusTicket;
import servicedesk.entity.ticket.Prioridad;
import servicedesk.entity.ticket.Seccion;
import servicedesk.entity.usuario.Cuenta;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class TicketDto {
	private Long id;
	private String asunto;
	private String descripcionCambios;
	private Date fechaCreacion;
	private Date fechaModificacion;

	private EstatusTicket estatus;
	private Seccion seccion;
	private Categoria categoria;
	private Prioridad prioridad;
	private Cuenta autor;
	private Cuenta asignado;
}
