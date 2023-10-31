package servicedesk.dto;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import servicedesk.entity.Categoria;
import servicedesk.entity.Prioridad;
import servicedesk.entity.Seccion;
import servicedesk.entity.Usuario;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class TicketDto {
    private Long id;
	private String estatus; 
	private String asunto;
	private String descripcionCambios;
	private Date fechaCreacion;
	private Date fechaModificacion;
    
	private Seccion seccion;
	private Usuario usuario;
	private Categoria categoria;
	private Prioridad prioridad;
}
