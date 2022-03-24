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
import br.recode.Luna_viagens.backend.models.Pacote;
import br.recode.Luna_viagens.backend.repository.DaoPacote;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/pacotes")
public class ControlePacote {
	
	@Autowired
	private DaoPacote dao;
	
	// get all packages
	@GetMapping
	public List<Pacote> getAllPackage() {
		return dao.findAll();
	}
	
	// get package by id rest api
	@GetMapping("/{id}")
	public ResponseEntity<Pacote> getPackageById(@PathVariable Long id) {
		Pacote pacote = dao.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Pacote não existe com id " + id));
		return ResponseEntity.ok(pacote);

	}
	
	// create package rest api
	@PostMapping
	public Pacote createPackage(@RequestBody Pacote pacote) {
		return dao.save(pacote);
	}
	
	
	// update pacote rest api
	@PutMapping("/{id}")
	public ResponseEntity<Pacote> updatePackage(@PathVariable Long id, @RequestBody Pacote packageDetails) {
		Pacote pacote = dao.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Pacote não existe com id " + id));
		
		pacote.setNome(packageDetails.getNome());
		pacote.setCidade(packageDetails.getCidade());
		pacote.setEstado(packageDetails.getEstado());
		pacote.setHotel(packageDetails.getHotel());
		pacote.setPeriodo(packageDetails.getPeriodo());
		
		Pacote updatePacote = dao.save(pacote);
		return ResponseEntity.ok(updatePacote);
		
	}
	
	// delete package rest api
	@DeleteMapping("/{id}")
	public ResponseEntity<Map<String, Boolean>> deletePackage(@PathVariable Long id) {
		Pacote pacote = dao.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Pacote não existe com id " + id));
		dao.delete(pacote);
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return ResponseEntity.ok(response);
	}
}
