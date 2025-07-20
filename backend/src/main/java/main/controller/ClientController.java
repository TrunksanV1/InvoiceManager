package main.controller; 

import main.entity.Client;
import main.repository.ClientRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/clients")
public class ClientController {
    private final ClientRepository clientRepository;

    public ClientController(ClientRepository clientRepository){
        this.clientRepository = clientRepository;
    }

    @GetMapping
    public List<Client> getAllClients(){
        return clientRepository.findAll();
    }

    @GetMapping("/{id}")
    public Client getClientById(@PathVariable int id){
        return clientRepository.findById(id).orElseThrow();
    }

    @PostMapping
    public Client createClient(@RequestBody Client client){
        return clientRepository.save(client);
    }

    @DeleteMapping("/{id}")
    public void deleteClient(@PathVariable int id) {
        clientRepository.deleteById(id);
    }
}
