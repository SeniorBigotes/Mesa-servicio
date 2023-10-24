package servicedesk.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import servicedesk.entity.Persona;

@Repository
public interface IPersonaRep extends JpaRepository<Persona, Long> {}