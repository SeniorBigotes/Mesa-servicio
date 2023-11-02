package servicedesk.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import servicedesk.entity.ticket.Categoria;

public interface ICategoriaRep extends JpaRepository<Categoria, Long> {}
