package servicedesk.dto;

import servicedesk.entity.Cuenta;

public class PersonaDto {
    private Long id;
    private String nombre;
    private String apellidoP;
    private String apellidoM;
    private String email;
    private String telefono;
    
    private Cuenta cuenta;

    // Constructores
    public PersonaDto() {}

    public PersonaDto(Long id, String nombre, String apellidoP, String apellidoM, String email, String telefono,
	    Cuenta cuenta) {
	this.id = id;
	this.nombre = nombre;
	this.apellidoP = apellidoP;
	this.apellidoM = apellidoM;
	this.email = email;
	this.telefono = telefono;
	this.cuenta = cuenta;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getApellidoP() {
        return apellidoP;
    }

    public void setApellidoP(String apellidoP) {
        this.apellidoP = apellidoP;
    }

    public String getApellidoM() {
        return apellidoM;
    }

    public void setApellidoM(String apellidoM) {
        this.apellidoM = apellidoM;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getTelefono() {
        return telefono;
    }

    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }

    public Cuenta getCuenta() {
        return cuenta;
    }

    public void setCuenta(Cuenta cuenta) {
        this.cuenta = cuenta;
    }
}
