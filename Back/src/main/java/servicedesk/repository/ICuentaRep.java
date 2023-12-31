package servicedesk.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import servicedesk.entity.usuario.Cuenta;

@Repository
public interface ICuentaRep extends JpaRepository<Cuenta, Long> {
    Optional<Cuenta> findByNombreUsuario(String nombreUsuario);
}