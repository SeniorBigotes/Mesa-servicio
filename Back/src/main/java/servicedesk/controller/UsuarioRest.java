package servicedesk.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import servicedesk.entity.auth.AuthResponse;
import servicedesk.entity.auth.LoginRequest;
import servicedesk.entity.auth.RegisterRequest;
import servicedesk.entity.usuario.Cuenta;
import servicedesk.entity.usuario.Perfil;
import servicedesk.entity.usuario.Usuario;
import servicedesk.services.UsuarioService;
import servicedesk.dto.UsuarioDto;

@RestController
@RequestMapping("/auth")
public class UsuarioRest {

    @Autowired
    private UsuarioService usuarioService;

    // Visualizar perfil perfil
    @GetMapping(value = "perfiles")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<?> perfiles() {
        return ResponseEntity.ok(usuarioService.findAllPerfles());
    }
    
    // Visualizar cuenta de usuario
    @GetMapping(value = "cuentas")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<?> cuentas() {
        return ResponseEntity.ok(usuarioService.findAllCuentas());
    }

    // VISUALIZAR ROLES
    @GetMapping(value = "/roles")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<?> roles() {
        return ResponseEntity.ok(usuarioService.findAllRoles());
    }

    // Visualizar perfil por ID
    @GetMapping(value = "perfiles/{id}")
    public ResponseEntity<?> perfilID(@PathVariable Long id) {
        Perfil perfil = null;
        String response = "";

        try {
            perfil = usuarioService.findPerfilById(id);
            
            if (perfil == null) {
                response = "El perfil con el ID: ".concat(id.toString()).concat("no existe en la base de datos");
                return new ResponseEntity<String>(response, HttpStatus.NOT_FOUND);
            }
            return new ResponseEntity<Perfil>(perfil, HttpStatus.OK);
        
        } catch (DataAccessException e) {
            response = "Error al realizar la consulta";
            response = response.concat(e.getMessage().concat(e.getMostSpecificCause().toString()));
            return new ResponseEntity<String>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    // Visualizar cuenta por ID
    @GetMapping(value = "cuentas/{id}")
    public ResponseEntity<?> cuentaID(@PathVariable Long id) {
        Cuenta cuenta = null;
        String response = "";

        try {
            cuenta = usuarioService.findCuentaById(id);
            
            if (cuenta == null) {
                response = "La cuenta con el ID: ".concat(id.toString()).concat("no existe en la base de datos");
                return new ResponseEntity<String>(response, HttpStatus.NOT_FOUND);
            }
            return new ResponseEntity<Cuenta>(cuenta, HttpStatus.OK);
        
        } catch (DataAccessException e) {
            response = "Error al realizar la consulta";
            response = response.concat(e.getMessage().concat(e.getMostSpecificCause().toString()));
            return new ResponseEntity<String>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // inicio de sesion
    @PostMapping(value = "/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        try {
            // caso de exito
            return ResponseEntity.ok(usuarioService.login(request));
        } catch (BadCredentialsException e) {
            // Las credenciales son incorrectas
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("Credenciales incorrectas.");
        } catch (Exception e) {
            // Manejo de otras excepciones
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error al iniciar sesion.");
        }
    }

    // CREAR UN USUARIO
    @PostMapping(value = "/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
        Map<String, Object> response = new HashMap<>();
        AuthResponse newRequest = usuarioService.register(request);

        try {
            response.put("mensaje", "Usuario creado con exito");
            response.put("usuario", newRequest);
            return new ResponseEntity<Map<String, Object>>(response, HttpStatus.CREATED);

        } catch(DataAccessException e) {
            response.put("mensaje", "Error al realizar el insert");
            response.put("error", e.getMessage().concat(e.getMostSpecificCause().getLocalizedMessage()));
            return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // ACTUALIZAR USUARIO
    @PutMapping(value = "/register/{id}")
    public ResponseEntity<?> actuaizarUsuario(@RequestBody UsuarioDto actualizarUsuario, @PathVariable Long id) {
        Usuario usuario = null;
        Map<String, Object> response = new HashMap<>();

        try {
            usuario = usuarioService.updateUser(actualizarUsuario, id);

            if(usuario == null) {
                response.put("error", "Usuario no existente");
                return new ResponseEntity<Map<String, Object>>(response, HttpStatus.NOT_FOUND);
            }

            response.put("mensaje", "Persona actualizada con éxito");
            response.put("persona", usuario);
            return new ResponseEntity<Map<String, Object>>(response, HttpStatus.OK);

        } catch(DataAccessException e) {
            response.put("mensaje", "Error al actualizar");
            response.put("error", e.getMessage().concat(e.getMostSpecificCause().getLocalizedMessage()));
            return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}