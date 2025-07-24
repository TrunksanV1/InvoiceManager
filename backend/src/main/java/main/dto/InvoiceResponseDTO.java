package main.dto;

import java.util.List;
import java.util.stream.Collectors;
import main.entity.Invoice;


public class InvoiceResponseDTO {
    private int id;
    private String date;
    private String status;
    private boolean tva;
    private int tva_rate;
    private String greeting;
    private String object;
    private ClientDTO client;
    private List<DesignationDTO> designations;

    public InvoiceResponseDTO(Invoice invoice) {
        this.id = invoice.getId();
        this.date = invoice.getDate().toString();
        this.status = invoice.getStatus();
        this.tva = invoice.isTva();
        this.tva_rate = invoice.getTva_rate();
        this.greeting = invoice.getGreeting();
        this.object = invoice.getObject();
        this.client = (invoice.getClient() != null)
            ? new ClientDTO(invoice.getClient())
            : new ClientDTO(null);; // fallback
        if (invoice.getDesignations() != null) {
            this.designations = invoice.getDesignations()
            .stream()
            .map(d -> new DesignationDTO(
                d.getDate(),
                d.getDeparture(),
                d.getArrival(),
                d.getBf(), // or d.isB_f()
                d.getAmount(),
                d.getName()
            ))
            .collect(Collectors.toList());
        }
    }

    // Getters and setters 
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public boolean isTva() {
        return tva;
    }

    public void setTva(boolean tva) {
        this.tva = tva;
    }

    public int getTva_rate() {
        return tva_rate;
    }

    public void setTva_rate(int tva_rate) {
        this.tva_rate = tva_rate;
    }

    public String getGreeting() {
        return greeting;
    }

    public void setGreeting(String greeting) {
        this.greeting = greeting;
    }

    public String getObject() {
        return object;
    }

    public void setObject(String object) {
        this.object = object;
    }

    public ClientDTO getClient() {
        return client;
    }

    public void setClient(ClientDTO client) {
        this.client = client;
    }

    public List<DesignationDTO> getDesignations() {
        return designations;
    }

    public void setDesignations(List<DesignationDTO> designations) {
        this.designations = designations;
    }

}
