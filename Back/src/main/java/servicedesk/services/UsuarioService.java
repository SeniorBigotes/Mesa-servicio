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
import servicedesk.dto.UsuarioDto;
import servicedesk.entity.auth.AuthResponse;
import servicedesk.entity.auth.LoginRequest;
import servicedesk.entity.auth.RegisterRequest;
import servicedesk.entity.usuario.Cuenta;
import servicedesk.entity.usuario.EstatusUsuario;
import servicedesk.entity.usuario.Perfil;
import servicedesk.entity.usuario.Role;
import servicedesk.entity.usuario.Roles;
import servicedesk.entity.usuario.Usuario;
import servicedesk.repository.IUsuarioRep;
import servicedesk.repository.ICuentaRep;
import servicedesk.repository.IPerfilRep;
import servicedesk.repository.IRolRep;

@Service
@RequiredArgsConstructor
public class UsuarioService {

    @Autowired private IUsuarioRep usuarioRep;
    @Autowired private IRolRep rolRep;
    @Autowired private ICuentaRep cuentaRep;
    @Autowired private IPerfilRep perfilRep;
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

    // Ver todos los perfiles de los usuarios
    @Transactional(readOnly = true)
    public List<Perfil> findAllPerfles() {
        return perfilRep.findAll();
    }

    // Ver todas las cuentas de los usuarios
    @Transactional(readOnly = true)
    public List<Cuenta> findAllCuentas() {
        return cuentaRep.findAll();
    }

    // Consulta perfil por Id
    public Perfil findPerfilById(Long id) {
        return (Perfil) perfilRep.findById(id).orElse(null);
    }

    // Consulta cuenta por Id
    public Cuenta findCuentaById(Long id) {
        return (Cuenta) cuentaRep.findById(id).orElse(null);
    }

    // Inicio de sesion (ajustar a la clase cuenta)
    public AuthResponse login(LoginRequest request) {
        authenticationManager.authenticate( // solicitar credenciales para autentificacion
            new UsernamePasswordAuthenticationToken(request.getNombreUsuario(), request.getContraseña())
        );
        UserDetails user = cuentaRep.findByNombreUsuario(
            request.getNombreUsuario()).orElseThrow(); // buscamos al usuario en la BD
        String token = jwtService.getToken(user); // Generamostoken con los datos del usuario
        return AuthResponse.builder() // retorno
            .token(token) // añadimos el token
            .build();
    }

    // creamos registro de usuario con codificacion (nuevo usuario)
    @Transactional
    public AuthResponse register(RegisterRequest request) {
        String rolString = request.getRole();
        Role rol = Role.valueOf(rolString);
        Usuario usuario = Usuario.builder()
            .nombreUsuario(request.getNombreUsuario())
            .contraseña(passwordEncoder.encode(request.getContraseña()))
            .nombre(request.getNombre())
            .apellidoP(request.getApellidoP())
            .apellidoM(request.getApellidoM())
            .correo(request.getCorreo())
            .telefono(request.getTelefono())
            .role(rol)
            .estatus(EstatusUsuario.ACTIVO)
            .build();

        Perfil perfil = new Perfil();
        perfil.setNombre(usuario.getNombre());
        perfil.setApellidoP(usuario.getApellidoP());
        perfil.setApellidoM(usuario.getApellidoM());
        perfil.setCorreo(usuario.getCorreo());
        perfil.setTelefono(usuario.getTelefono());
        perfil.setEstatus(usuario.getEstatus());

        Cuenta cuenta = new Cuenta();
        cuenta.setNombreUsuario(usuario.getNombreUsuario());
        cuenta.setContraseña(usuario.getContraseña());
        cuenta.setRole(usuario.getRole());
        cuenta.setPerfil(perfil);

        // Se almacena en la base de datos
        perfilRep.save(perfil);
        cuentaRep.save(cuenta);
                
        // retornamos token
        return AuthResponse.builder()
                .token(jwtService.getToken(usuario))
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