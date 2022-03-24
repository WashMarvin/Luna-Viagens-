package br.recode.Luna_viagens.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.recode.Luna_viagens.backend.models.Cliente;

@Repository
public interface DaoCliente extends JpaRepository<Cliente, Long> {

}
