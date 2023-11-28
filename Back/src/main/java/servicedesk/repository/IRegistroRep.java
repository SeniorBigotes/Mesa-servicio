package servicedesk.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import servicedesk.entity.ticket.Registro;

public interface IRegistroRep extends JpaRepository<Registro, Long> {}
