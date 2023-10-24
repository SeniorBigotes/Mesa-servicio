package servicedesk.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import servicedesk.controller.auth.AuthResponse;
import servicedesk.controller.auth.LoginRequest;
import servicedesk.controller.auth.RegisterRequest;
import servicedesk.entity.Cuenta;
import servicedesk.services.CuentaService;

@RestController
@RequestMapping("/auth")
public class CuentaRest {
    @Autowired
    private CuentaService cuentaService;
    
    // Ver todos los usuarios
    @GetMapping("/cuentas")
    public ResponseEntity<List<Cuenta>> consulta() {
	return ResponseEntity.ok(cuentaService.findAll());
    }
    
    // inicio de sesion
    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest request) {
	return ResponseEntity.ok(cuentaService.login(request));
    }
    
    // crear usuario
    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody RegisterRequest request) {
	return ResponseEntity.ok(cuentaService.register(request));
    }
}