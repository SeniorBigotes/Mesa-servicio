package servicedesk.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import servicedesk.entity.ticket.Seccion;

public interface ISeccionRep extends JpaRepository<Seccion, Long> {}
