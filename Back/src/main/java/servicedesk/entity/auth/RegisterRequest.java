package servicedesk.entity.auth;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import servicedesk.entity.ticket.Seccion;
import servicedesk.entity.usuario.EstatusUsuario;

@Data // getters and setters autpmaticas
@Builder // construye objetos de manera limpia
// modifica de forma automatica
@AllArgsConstructor
@NoArgsConstructor
public class RegisterRequest {
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
