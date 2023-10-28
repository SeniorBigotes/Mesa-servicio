package servicedesk.controller;

import java.security.Principal;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import servicedesk.entity.Cuenta;
import servicedesk.repository.ICuentaRep;
import servicedesk.services.CuentaService;

/* SE REQUIERE INCIO DE SESION PARA ACCEDER A ESTA PARTE */


@RestController
@RequestMapping("/user")
@CrossOrigin
@RequiredArgsConstructor
public class DemoRest {
    
    @Autowired private CuentaService cuentaService;
    @Autowired private ICuentaRep cuentaRep;
    
    @GetMapping("/demo")
    public ResponseEntity<List<Cuenta>> consulta() {
        return ResponseEntity.ok(cuentaService.findAll());
    }
    
    @GetMapping("/user-logged")
    public Optional<Cuenta> obtenerUsuarioLogeado(Principal principal) {
        return cuentaRep.findByNombreUsuario(principal.getName());
    }
}
