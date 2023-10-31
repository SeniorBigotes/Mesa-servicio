package servicedesk.entity;

import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
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
@Table(name = "usuarios", uniqueConstraints = { @UniqueConstraint(columnNames = { "nombre_usuario" }) })
public class Usuario implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "nombre_usuario", nullable = false)
    private String nombreUsuario;
    @Column(nullable = false)
    private String contraseña;
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
    
    @Column(name = "rol", nullable = false)
    @Enumerated(EnumType.STRING)
    private Role role;
    
    @Column(name = "estatus")  
    @Enumerated(EnumType.STRING)
    private Estatus estatus;
    

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority((role.name())));
    }

    @Override
    public String getPassword() {
        return getContraseña();
    }

    @Override
    public String getUsername() {
        return getNombreUsuario();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}