package servicedesk.entity;

import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;
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
@Table(name = "cuentas",
	uniqueConstraints = {@UniqueConstraint(columnNames = {"username"})})
public class Cuenta implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "nombre_usuario", nullable = false)
    private String usuario;
    private String contraseña;
    private String nombre;
    @Column(name = "apellido_paterno")
    private String apellidoP;
    @Column(name = "apellido_materno")
    private String apellidoM;
    private String correo;
    private String telefono;
    
    @Enumerated(EnumType.STRING)
    private Role rol;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
	return null;
    }

    @Override
    public String getPassword() {
	return null;
    }

    @Override
    public String getUsername() {
	return null;
    }

    @Override
    public boolean isAccountNonExpired() {
	return false;
    }

    @Override
    public boolean isAccountNonLocked() {
	return false;
    }

    @Override
    public boolean isCredentialsNonExpired() {
	return false;
    }

    @Override
    public boolean isEnabled() {
	return false;
    }
}