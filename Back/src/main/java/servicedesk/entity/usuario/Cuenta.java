package servicedesk.entity.usuario;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import jakarta.persistence.PrimaryKeyJoinColumn;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "cuentas", uniqueConstraints = { @UniqueConstraint(columnNames = { "nombre_usuario" }) })
public class Cuenta {
     @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "nombre_usuario", nullable = false)
    private String nombreUsuario;
    @Column(nullable = false)
    private String contraseña;

    @Column(name = "rol", nullable = false)
    @Enumerated(EnumType.STRING)
    private Role role;

    @OneToOne(cascade = CascadeType.ALL)
    @PrimaryKeyJoinColumn
    private Perfil perfil;
}
