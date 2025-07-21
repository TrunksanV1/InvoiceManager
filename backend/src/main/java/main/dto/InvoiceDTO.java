package main.dto;

public class InvoiceDTO {
    private int id;
    private int clientId;
    private String date;
    private double amount;
    private String status;
    private String departure;
    private String arrival;
    private boolean b_f;
    private boolean tva;
    private int tva_rate;
    private String greeting;

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

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getDeparture() {
        return departure;
    }

    public void setDeparture(String departure) {
        this.departure = departure;
    }

    public String getArrival() {
        return arrival;
    }

    public void setArrival(String arrival) {
        this.arrival = arrival;
    }

    public boolean isB_f() {
        return b_f;
    }

    public void setB_f(boolean b_f) {
        this.b_f = b_f;
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

}
