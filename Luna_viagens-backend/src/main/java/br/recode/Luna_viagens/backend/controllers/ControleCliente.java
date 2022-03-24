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
import br.recode.Luna_viagens.backend.models.Cliente;
import br.recode.Luna_viagens.backend.repository.DaoCliente;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/clientes")
public class ControleCliente {
	
	@Autowired
	private DaoCliente dao;
	
	// get all clients
	@GetMapping
	public List<Cliente> getAllClients() {
		return dao.findAll();
	}
	
	// get client by id rest api
	@GetMapping("/{id}")
	public ResponseEntity<Cliente> getClientById(@PathVariable Long id) {
		Cliente cliente = dao.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Cliente não existe com a id " + id));
		return ResponseEntity.ok(cliente);
							
	}
	
	// create client rest api
	@PostMapping
	public Cliente createClient(@RequestBody Cliente cliente) {
		return dao.save(cliente);
	}
	
	
	// update client rest api
	@PutMapping("/{id}")
	public ResponseEntity<Cliente> updateClient(@PathVariable Long id, @RequestBody Cliente clientDetails) {
		Cliente cliente = dao.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Cliente não existe com a id " + id));
		
		cliente.setNome(clientDetails.getNome());
		cliente.setEndereco(clientDetails.getEndereco());
		cliente.setEmail(clientDetails.getEmail());
		cliente.setCpf(clientDetails.getCpf());
		cliente.setTelefone(clientDetails.getTelefone());
		
		Cliente updateClient = dao.save(cliente);
		return ResponseEntity.ok(updateClient);
	}
	
	// delete client rest api
	@DeleteMapping("/{id}")
	public ResponseEntity<Map<String, Boolean>> deleteClient(@PathVariable Long id) {
		Cliente cliente = dao.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Cliente não existe com a id " + id));
		
		dao.delete(cliente);
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return ResponseEntity.ok(response);
	} 
	
	
	
	

}
