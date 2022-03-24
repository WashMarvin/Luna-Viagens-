package br.recode.Luna_viagens.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.recode.Luna_viagens.backend.models.Destino;

@Repository
public interface DaoDestino extends JpaRepository<Destino, Long> {

}
