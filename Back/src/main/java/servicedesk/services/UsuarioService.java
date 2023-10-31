package servicedesk.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;
import servicedesk.entity.Usuario;
import servicedesk.dto.UsuarioDto;
import servicedesk.entity.Estatus;
import servicedesk.entity.Role;
import servicedesk.entity.Roles;
import servicedesk.entity.auth.AuthResponse;
import servicedesk.entity.auth.LoginRequest;
import servicedesk.entity.auth.RegisterRequest;
import servicedesk.repository.IUsuarioRep;
import servicedesk.repository.IRolRep;

@Service
@RequiredArgsConstructor
public class UsuarioService {

    @Autowired private IUsuarioRep usuarioRep;
    @Autowired private IRolRep rolRep;
    @Autowired private JwtService jwtService;
    @Autowired private PasswordEncoder passwordEncoder;
    @Autowired private AuthenticationManager authenticationManager;

    // Buscar todos los usuarios
    @Transactional(readOnly = true)
    public List<Usuario> findAll() {
        return usuarioRep.findAll();
    }

    // Iterar sobre los roles
    @Transactional(readOnly = true)
    public List<Roles> findAllRoles() {
        return rolRep.findAll();
    }

    // Inicio de sesion
    public AuthResponse login(LoginRequest request) {
        authenticationManager.authenticate( // solicitar credenciales para autentificacion
            new UsernamePasswordAuthenticationToken(request.getNombreUsuario(), request.getContraseña())
        );
        UserDetails user = usuarioRep.findByNombreUsuario(
            request.getNombreUsuario()).orElseThrow(); // buscamos al usuario en la BD
        String token = jwtService.getToken(user); // Generamostoken con los datos del usuario
        return AuthResponse.builder() // retoro
            .token(token) // añadimos el token
            .build();
    }

    // creamos registro de usuario con codificacion (nuevo usuario)
    public AuthResponse register(RegisterRequest request) {
        String rolString = request.getRole();
        Role rol = Role.valueOf(rolString);
        Usuario cuenta = Usuario.builder()
                .nombreUsuario(request.getNombreUsuario())
                .contraseña(passwordEncoder.encode(request.getContraseña()))
                .nombre(request.getNombre())
                .apellidoP(request.getApellidoP())
                .apellidoM(request.getApellidoM())
                .correo(request.getCorreo())
                .telefono(request.getTelefono())
                .role(rol)
                .estatus(Estatus.ACTIVO)
                .build();

                // persona: nombres, apellidos, contacto
                // cuenta: usuario, contraseña, rol, estatus
        // Se almacena en la base de datos
        usuarioRep.save(cuenta);

        // retornamos token
        return AuthResponse.builder()
                .token(jwtService.getToken(cuenta))
                .build();
    }

    // Actualizar usuario
    public Usuario updateUser(UsuarioDto newUsuario, Long id) {
        String rolString = newUsuario.getRole();
        Role rol = Role.valueOf(rolString);
        Usuario usuario = new Usuario();

        usuario = usuarioRep.findById(id).orElse(null);

        if(usuario == null) {
            return null;
        }

        // Datos generales
        usuario.setNombre(newUsuario.getNombre());
        usuario.setApellidoP(newUsuario.getApellidoP());
        usuario.setApellidoM(newUsuario.getApellidoM());
        usuario.setCorreo(newUsuario.getCorreo());
        usuario.setTelefono(newUsuario.getTelefono());
        //  Datos de la cuenta
        usuario.setNombreUsuario(newUsuario.getNombreUsuario());
        usuario.setContraseña(passwordEncoder.encode(newUsuario.getContraseña()));
        usuario.setRole(rol);
        // Estatus
        usuario.setEstatus(newUsuario.getEstatus());

        return usuarioRep.save(usuario);
    }
}