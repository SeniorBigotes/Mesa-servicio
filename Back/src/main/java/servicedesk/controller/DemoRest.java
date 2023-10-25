package servicedesk.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import servicedesk.entity.Cuenta;
import servicedesk.services.CuentaService;

/* SE REQUIERE INCIO DE SESION PARA ACCEDER A ESTA PARTE */

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class DemoRest {

    @Autowired private CuentaService cuentaService;

    @PostMapping("/demo")
    public ResponseEntity<List<Cuenta>> consulta() {
        return ResponseEntity.ok(cuentaService.findAll());
    }
}
