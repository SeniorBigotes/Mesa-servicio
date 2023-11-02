package servicedesk.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import servicedesk.entity.usuario.Roles;

public interface IRolRep extends JpaRepository<Roles, Long> {}
