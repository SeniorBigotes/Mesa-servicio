package servicedesk.dto;

import javax.management.relation.Role;

import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CuentaDto {
    private Long id;
    private String nombreUsuario;
    private String contraseña;
    private String nombre;
    private String apellidoP;
    private String apellidoM;
    private String correo;
    private String telefono;
    
    @Enumerated(EnumType.STRING)
    private Role role;
}
