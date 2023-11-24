package servicedesk.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import servicedesk.entity.ticket.Seccion;
import servicedesk.entity.usuario.EstatusUsuario;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UsuarioDto {
    private Long id;
    private String nombreUsuario;
    private String contraseña;
    private String nombre;
    private String apellidoP;
    private String apellidoM;
    private String correo;
    private String telefono;
    private String role;

    private EstatusUsuario estatus;
    private Seccion seccion;
}
