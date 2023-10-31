package servicedesk.controller;

import java.util.HashMap;
import java.util.List;
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
import servicedesk.services.UsuarioService;
import servicedesk.dto.UsuarioDto;
import servicedesk.entity.Roles;
import servicedesk.entity.Usuario;

@RestController
@RequestMapping("/auth")
public class UsuarioRest {

    @Autowired
    private UsuarioService usuarioService;

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

    // VISUALIZAR ROLES
    @GetMapping(value = "/roles")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<List<Roles>> roles() {
        return ResponseEntity.ok(usuarioService.findAllRoles());
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