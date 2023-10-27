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
import servicedesk.entity.Cuenta;
import servicedesk.entity.Role;
import servicedesk.entity.auth.AuthResponse;
import servicedesk.entity.auth.LoginRequest;
import servicedesk.entity.auth.RegisterRequest;
import servicedesk.repository.ICuentaRep;

@Service
@RequiredArgsConstructor
public class CuentaService {

    @Autowired private ICuentaRep cuentaRep;
    @Autowired private JwtService jwtService;
    @Autowired private PasswordEncoder passwordEncoder;
    @Autowired private AuthenticationManager authenticationManager;

    // Buscar todos
    @Transactional(readOnly = true)
    public List<Cuenta> findAll() {
        return cuentaRep.findAll();
    }

    // Buscar por id
    public Cuenta findById(Long id) {
        return cuentaRep.findById(id).orElse(null);
    }

    // Inicio de sesion
    public AuthResponse login(LoginRequest request) {
        authenticationManager.authenticate( // solicitar credenciales para autentificacion
            new UsernamePasswordAuthenticationToken(request.getNombreUsuario(), request.getContraseña())
        );
        UserDetails user = cuentaRep.findByNombreUsuario(
            request.getNombreUsuario()).orElseThrow(); // buscamos al usuario en la BD
        String token = jwtService.getToken(user); // Generamostoken con los datos del usuario
        return AuthResponse.builder() // retoro
            .token(token) // añadimos el token
            .build();
    }

    // creamos registro de usuario con codificacion (nuevo usuario)
    public AuthResponse register(RegisterRequest request) {
        Cuenta cuenta = Cuenta.builder()
                .nombreUsuario(request.getNombreUsuario())
                .contraseña(passwordEncoder.encode(request.getContraseña()))
                .nombre(request.getNombre())
                .apellidoP(request.getApellidoP())
                .apellidoM(request.getApellidoM())
                .correo(request.getCorreo())
                .telefono(request.getTelefono())
                .role(Role.SUPERADMIN)
                .build();

        // Se almacena en la base de datos
        cuentaRep.save(cuenta);

        // retornamos token
        return AuthResponse.builder()
                .token(jwtService.getToken(cuenta))
                .build();
    }

    // obtener cuenta logeada
    public String loggedInAccount(Long id) {
        Cuenta cuenta = findById(id);

        if(cuenta == null) {
            return null;
        }
        String usuario = cuenta.getNombreUsuario();

        if(usuario == "") {
            return null;
        }

        return usuario;
    }
}
