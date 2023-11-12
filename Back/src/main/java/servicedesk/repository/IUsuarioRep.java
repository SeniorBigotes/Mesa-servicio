package servicedesk.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import servicedesk.entity.usuario.Usuario;

@Repository
public interface IUsuarioRep extends JpaRepository<Usuario, Long> {
}