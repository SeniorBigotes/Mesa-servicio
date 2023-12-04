package servicedesk.entity.ticket;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import servicedesk.entity.usuario.Cuenta;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "registros")
public class Registro {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Date fecha;
    private String cambios;
    private String estatus;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "prioridad_id")
    @JsonIgnoreProperties({ "hibernateLazyInitializer", "handler" })
    private Prioridad prioridad;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ticket_id")
    @JsonIgnoreProperties({ "hibernateLazyInitializer", "handler" })
    private Ticket ticket;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "modifico_id")
    @JsonIgnoreProperties({ "hibernateLazyInitializer", "handler" })
    private Cuenta modifico;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "asignado_id")
    @JsonIgnoreProperties({ "hibernateLazyInitializer", "handler" })
    private Cuenta asignado;
    ;
}
