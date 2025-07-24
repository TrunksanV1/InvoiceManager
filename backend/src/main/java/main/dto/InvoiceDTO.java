package main.dto;
import java.util.List;

public class InvoiceDTO {
    private int id;
    private int clientId;
    private String date;
    private String status;
    private boolean tva;
    private int tva_rate;
    private String greeting;
    private List<DesignationDTO> designations;
    private String object;

    

    public List<DesignationDTO> getDesignations() {
        return designations;
    }

    public void setDesignations(List<DesignationDTO> designations) {
        this.designations = designations;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getClientId() {
        return clientId;
    }

    public void setClientId(int clientId) {
        this.clientId = clientId;
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

}
