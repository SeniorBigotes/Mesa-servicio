package servicedesk.dto;

import servicedesk.entity.Rol;
import servicedesk.entity.Persona;

public class CuentaDto {
    private Long id;
    private String nombreUsuario;
    private String contraseña;
    
    private Persona persona;
    private Rol rol;
    
    // Constructores
    public CuentaDto() {}
    
    public CuentaDto(Long id, String nombreUsuario, String contraseña, Persona persona, Rol rol) {
	this.id = id;
	this.nombreUsuario = nombreUsuario;
	this.contraseña = contraseña;
	this.persona = persona;
	this.rol = rol;
    }
    
    // Getters and Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public String getNombreUsuario() {
        return nombreUsuario;
    }
    
    public void setNombreUsuario(String nombreUsuario) {
        this.nombreUsuario = nombreUsuario;
    }
    
    public String getContraseña() {
        return contraseña;
    }
    
    public void setContraseña(String contraseña) {
        this.contraseña = contraseña;
    }
    
    
    public Persona getPersona() {
        return persona;
    }
    
    public void setPersona(Persona persona) {
        this.persona = persona;
    }
    
    public Rol getRol() {
        return rol;
    }
    
    public void setRol(Rol rol) {
        this.rol = rol;
    }
}
