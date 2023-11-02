package servicedesk.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import servicedesk.entity.ticket.Prioridad;

public interface IPrioridadRep extends JpaRepository<Prioridad, Long> {}
