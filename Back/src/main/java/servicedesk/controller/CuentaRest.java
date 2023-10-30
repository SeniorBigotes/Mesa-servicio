package servicedesk.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import servicedesk.entity.auth.AuthResponse;
import servicedesk.entity.auth.LoginRequest;
import servicedesk.entity.auth.RegisterRequest;
import servicedesk.services.CuentaService;
import servicedesk.entity.Roles;

@RestController
@RequestMapping("/auth")
public class CuentaRest {

    @Autowired
    private CuentaService cuentaService;

    // inicio de sesion
    @PostMapping(value = "/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        try {
            // caso de exito
            return ResponseEntity.ok(cuentaService.login(request));
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

    // crear usuario
    @PostMapping(value = "/register")
    public ResponseEntity<AuthResponse> register(@RequestBody RegisterRequest request) {
        return ResponseEntity.ok(cuentaService.register(request));
    }

    @GetMapping(value = "/roles")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<List<Roles>> roles() {
        return ResponseEntity.ok(cuentaService.findAllRoles());
    }
}