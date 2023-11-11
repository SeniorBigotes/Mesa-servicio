package servicedesk.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import servicedesk.entity.usuario.Perfil;

public interface IPerfilRep extends JpaRepository <Perfil, Long> {}
