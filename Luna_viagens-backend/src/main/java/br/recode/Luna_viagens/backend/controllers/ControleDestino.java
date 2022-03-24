package br.recode.Luna_viagens.backend.controllers;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.recode.Luna_viagens.backend.exception.ResourceNotFoundException;
import br.recode.Luna_viagens.backend.models.Destino;
import br.recode.Luna_viagens.backend.repository.DaoDestino;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/destinos")
public class ControleDestino {
	
	@Autowired
	private DaoDestino dao;
	
	// get all destinations
	@GetMapping
	public List<Destino> getAllDestinations() {
		return dao.findAll();
	}
	
	// get destiny by id rest api
	@GetMapping("/{id}")
	public ResponseEntity<Destino> getDestinyById(@PathVariable Long id) {
		Destino destino = dao.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Destino não encontrado com id " + id));
		return ResponseEntity.ok(destino);
	}
	
	// create destiny rest api
	@PostMapping
	public Destino createDestiny(@RequestBody Destino destino) {
		return dao.save(destino);
	}
	
	// update destiny rest api
	@PutMapping("/{id}")
	public ResponseEntity<Destino> updatedestiny(@PathVariable Long id, @RequestBody Destino destinyDetails) {
		Destino destino = dao.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Destino não encontrado com id " + id));
		
		destino.setCidade(destinyDetails.getCidade());
		destino.setEstado(destinyDetails.getEstado());
		destino.setData(destinyDetails.getData());
		destino.setHora(destinyDetails.getHora());
		
		Destino updateDestiny = dao.save(destino);
		return ResponseEntity.ok(updateDestiny);
	}
	
	// delete destiny rest api
	@DeleteMapping("/{id}")
	public ResponseEntity<Map<String, Boolean>> deleteDestiny(@PathVariable Long id) {
		Destino destino = dao.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Destino não encontrado com id " + id));
		
		dao.delete(destino);
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return ResponseEntity.ok(response);
	}

}
