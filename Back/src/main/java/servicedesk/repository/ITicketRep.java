package servicedesk.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import servicedesk.entity.Ticket;

public interface ITicketRep extends JpaRepository <Ticket, Long> {}
