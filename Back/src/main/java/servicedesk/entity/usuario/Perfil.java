package servicedesk.entity.usuario;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "perfiles")
public class Perfil {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private String nombre;
    @Column(name = "apellido_paterno", nullable = false)
    private String apellidoP;
    @Column(name = "apellido_materno", nullable = false)
    private String apellidoM;
    @Column(nullable = false)
    private String correo;
    @Column(nullable = false)
    private String telefono;

    @Column(name = "estatus")
    @Enumerated(EnumType.STRING)
    private EstatusUsuario estatus;
}
