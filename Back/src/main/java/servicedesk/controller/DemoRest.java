package servicedesk.controller;

import java.security.Principal;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import servicedesk.entity.usuario.Cuenta;
import servicedesk.entity.usuario.Usuario;
import servicedesk.repository.ICuentaRep;
import servicedesk.services.UsuarioService;

/* SE REQUIERE INCIO DE SESION PARA ACCEDER A ESTA PARTE */

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class DemoRest {
    
    @Autowired private UsuarioService usuarioService;
    @Autowired private ICuentaRep cuentaRep;

    @Transactional(readOnly = true)
    public Cuenta findByID(Long id) {
        return cuentaRep.findById(id).orElse(null);
    }
    
    @GetMapping("/demo")
    public ResponseEntity<List<Usuario>> consulta() {
        return ResponseEntity.ok(usuarioService.findAll());
    }
    
    @GetMapping("/user-logged")
    public Optional<Cuenta> obtenerUsuarioLogeado(Principal principal) {
        return cuentaRep.findByNombreUsuario(principal.getName());
    }
}
