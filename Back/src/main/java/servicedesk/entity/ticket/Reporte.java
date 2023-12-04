package servicedesk.entity.ticket;

import java.util.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "reportes")
public class Reporte {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Date fechaInicio;
    private Date fechaFin;
    private int numTicketsCreados;
    private int numTicketsModificados;
    private int numTicketsCerrados;
    private int numTicketsPendientes;
    private int numTicketsAsignados;

    // Relacionamos con registros para tener el
    // numero total creadis en el mes
}
