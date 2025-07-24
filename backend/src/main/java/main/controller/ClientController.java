package main.controller; 

import main.entity.Client;
import main.repository.ClientRepository;
import main.repository.InvoiceRepository;
import org.springframework.web.bind.annotation.*;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import main.entity.Invoice;

@RestController
@RequestMapping("/clients")
public class ClientController {
    private final ClientRepository clientRepository;
    private final InvoiceRepository invoiceRepository;

    public ClientController(InvoiceRepository invoiceRepository, ClientRepository clientRepository){
        this.clientRepository = clientRepository;
        this.invoiceRepository = invoiceRepository;
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
    @Transactional
    public void deleteClient(@PathVariable int id) {
        List<Invoice> invoices = invoiceRepository.findByClientClientId(id);

        for (Invoice invoice : invoices) {
            invoice.setClient(null);
        }

        invoiceRepository.saveAll(invoices);

        clientRepository.deleteById(id);
    }
}
