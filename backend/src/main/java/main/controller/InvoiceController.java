package main.controller;

import main.entity.Invoice;
import main.repository.InvoiceRepository;
import org.springframework.web.bind.annotation.*;

import main.dto.InvoiceDTO;
import main.entity.Client;
import main.repository.ClientRepository;
import main.entity.Designation;
import main.dto.DesignationDTO;

import java.util.List;

@RestController
@RequestMapping("/invoices")
public class InvoiceController {
    private final InvoiceRepository invoiceRepository;
    private final ClientRepository clientRepository;

    public InvoiceController(InvoiceRepository invoiceRepository, ClientRepository clientRepository) {
        this.invoiceRepository = invoiceRepository;
        this.clientRepository = clientRepository;
    }

    @GetMapping
    public List<Invoice> getAllInvoices(){
        return invoiceRepository.findAll();
    }

    @GetMapping("/{id}")
    public Invoice getInvoiceById(@PathVariable int id){
        return invoiceRepository.findById(id).orElseThrow();
    }

    @PostMapping
    public Invoice createInvoice(@RequestBody InvoiceDTO invoiceDTO) {
    Client client = clientRepository.findById(invoiceDTO.getClientId())
            .orElseThrow(() -> new RuntimeException("Client not found"));

    Invoice invoice = new Invoice();
    invoice.setClient(client);
    try {
        java.text.SimpleDateFormat sdf = new java.text.SimpleDateFormat("yyyy-MM-dd");
        java.util.Date parsedDate = sdf.parse(invoiceDTO.getDate());
        invoice.setDate(parsedDate);
    } catch (java.text.ParseException e) {
        throw new RuntimeException("Invalid date format. Expected yyyy-MM-dd", e);
    }

    invoice.setStatus(invoiceDTO.getStatus());
    invoice.setTva(invoiceDTO.isTva());
    invoice.setTva_rate(invoiceDTO.getTva_rate());
    invoice.setGreeting(invoiceDTO.getGreeting());
    invoice.setObject(invoiceDTO.getObject());

    if (invoiceDTO.getDesignations() != null) {
        for (DesignationDTO d : invoiceDTO.getDesignations()) {
            Designation designation = new Designation(
                d.getDate(), d.getDeparture(), d.getArrival(), d.getB_f(), d.getAmount(),d.getName()
            );
            designation.setInvoice(invoice); // set back-reference
            invoice.addDesignation(designation); // add to invoice
        }
    }

    return invoiceRepository.save(invoice);
}

    @DeleteMapping("/{id}")
    public void deleteInvoice(@PathVariable int id){
        invoiceRepository.deleteById(id);
    }

    @PutMapping("/{id}")
public Invoice updateInvoice(@PathVariable int id, @RequestBody InvoiceDTO invoiceDTO) {
    Invoice existingInvoice = invoiceRepository.findById(id)
        .orElseThrow(() -> new RuntimeException("Invoice not found"));

    Client client = clientRepository.findById(invoiceDTO.getClientId())
        .orElseThrow(() -> new RuntimeException("Client not found"));

    existingInvoice.setClient(client);

    try {
        java.text.SimpleDateFormat sdf = new java.text.SimpleDateFormat("yyyy-MM-dd");
        java.util.Date parsedDate = sdf.parse(invoiceDTO.getDate());
        existingInvoice.setDate(parsedDate);
    } catch (java.text.ParseException e) {
        throw new RuntimeException("Invalid date format. Expected yyyy-MM-dd", e);
    }

    existingInvoice.setStatus(invoiceDTO.getStatus());
    existingInvoice.setTva(invoiceDTO.isTva());
    existingInvoice.setTva_rate(invoiceDTO.getTva_rate());
    existingInvoice.setGreeting(invoiceDTO.getGreeting());
    existingInvoice.setObject(invoiceDTO.getObject());

    // Clear old designations first (optional but usually recommended)
    existingInvoice.getDesignations().clear();

    if (invoiceDTO.getDesignations() != null) {
        for (DesignationDTO d : invoiceDTO.getDesignations()) {
            Designation designation = new Designation(
                d.getDate(), d.getDeparture(), d.getArrival(), d.getB_f(), d.getAmount(), d.getName()
            );
            designation.setInvoice(existingInvoice); // back-reference
            existingInvoice.addDesignation(designation);
        }
    }

    return invoiceRepository.save(existingInvoice);
}


}