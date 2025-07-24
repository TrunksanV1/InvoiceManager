package main.dto;

import java.util.Date;

public class DesignationDTO {
    private Date date;
    private String departure;
    private String arrival;
    private String b_f;
    private double amount;
    private String name; 

    public DesignationDTO(Date date, String departure, String arrival, String b_f, double amount, String name) {
        this.date = date;
        this.departure = departure;
        this.arrival = arrival;
        this.b_f = b_f;
        this.amount = amount;
        this.name = name;
    }
    // Getter and Setter for date
    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    // Getter and Setter for departure
    public String getDeparture() {
        return departure;
    }

    public void setDeparture(String departure) {
        this.departure = departure;
    }

    // Getter and Setter for arrival
    public String getArrival() {
        return arrival;
    }

    public void setArrival(String arrival) {
        this.arrival = arrival;
    }

    // Getter and Setter for b_f
    public String getBf() {
        return b_f;
    }

    public void setBf(String b_f) {
        this.b_f = b_f;
    }

    // Getter and Setter for amount
    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

        public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

}
