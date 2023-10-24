package servicedesk.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import servicedesk.entity.Cuenta;

@Repository
public interface ICuentaRep extends JpaRepository<Cuenta, Long> {
}