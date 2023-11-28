package servicedesk.entity.ticket;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
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
@Table(name = "tickets")
public class Ticket {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String asunto;
    @Column(name = "descripcion_cambios")
    private String descripcionCambios;
    @Column(name = "fecha_creacion")
    private Date fechaCreacion;
    @Column(name = "fecha_modificacion") // Renombrara la columna
    private Date fechaModificacion;

    @Enumerated(EnumType.STRING)
    private EstatusTicket estatus;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "seccion_id")
    @JsonIgnoreProperties({ "hibernateLazyInitializer", "handler" })
    private Seccion seccion; // a quien va dirigido

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "categoria_id")
    @JsonIgnoreProperties({ "hibernateLazyInitializer", "handler" })
    private Categoria categoria; // papeleria, administracion, etc...

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "prioridad_id")
    @JsonIgnoreProperties({ "hibernateLazyInitializer", "handler" })
    private Prioridad prioridad; // alta, media, baja

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "autor_id")
    @JsonIgnoreProperties({ "hibernateLazyInitializer", "handler" })
    private Cuenta autor; // ticket que creo el usuario

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "asignado_id")
    @JsonIgnoreProperties({ "hibernateLazyInitializer", "handler" })
    private Cuenta asignado; // ticket al usuario que va a signado
}
