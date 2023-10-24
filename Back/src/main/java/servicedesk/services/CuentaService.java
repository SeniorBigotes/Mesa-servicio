package servicedesk.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import servicedesk.controller.auth.AuthResponse;
import servicedesk.controller.auth.LoginRequest;
import servicedesk.controller.auth.RegisterRequest;
import servicedesk.entity.Cuenta;
import servicedesk.repository.ICuentaRep;

@Service
public class CuentaService {
    @Autowired
    private ICuentaRep cuentaRep;
    @Autowired
    
    // Buscar todos
    @Transactional(readOnly = true)
    public List<Cuenta> findAll() {
	return cuentaRep.findAll();
    }
    
    // Buscar por id
    public Cuenta findById(Long id) {
	return cuentaRep.findById(id).orElse(null);
    }

    public AuthResponse login(LoginRequest request) {
	// TODO Auto-generated method stub
	return null;
    }

    public AuthResponse register(RegisterRequest request) {
	// TODO Auto-generated method stub
	return null;
    }
}
