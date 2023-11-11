package servicedesk.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import servicedesk.entity.usuario.Cuenta;

public interface ICuentaRep extends JpaRepository<Cuenta, Long> {}
