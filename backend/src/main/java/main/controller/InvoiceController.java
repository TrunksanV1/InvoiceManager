package main.controller;

import main.entity.Invoice;
import main.repository.InvoiceRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/invoices")
public class InvoiceController {
    private final InvoiceRepository invoiceRepository;

    public InvoiceController(InvoiceRepository invoiceRepository){
        this.invoiceRepository = invoiceRepository;
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
    public Invoice createInvoice(@RequestBody Invoice invoice){
        return invoiceRepository.save(invoice);
    }

    @DeleteMapping("/{id}")
    public void deleteInvoice(@PathVariable int id){
        invoiceRepository.deleteById(id);
    }


}