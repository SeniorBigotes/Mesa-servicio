package servicedesk.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import servicedesk.entity.Rol;

@Repository
public interface IRol extends JpaRepository<Rol, Long> {}