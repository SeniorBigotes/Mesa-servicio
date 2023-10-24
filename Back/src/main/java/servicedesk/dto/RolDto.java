package servicedesk.dto;

import java.util.List;

import servicedesk.entity.Cuenta;

public class RolDto {
    private Long id;
    private String rol;
    
    private List<Cuenta> cuentas;

    // Constructores
    public RolDto() {}

    public RolDto(Long id, String rol, List<Cuenta> cuentas) {
	this.id = id;
	this.rol = rol;
	this.cuentas = cuentas;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getRol() {
        return rol;
    }

    public void setRol(String rol) {
        this.rol = rol;
    }

    public List<Cuenta> getCuentas() {
        return cuentas;
    }

    public void setCuentas(List<Cuenta> cuentas) {
        this.cuentas = cuentas;
    }
}
