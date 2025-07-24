package main.dto;
import main.entity.Client;
public class ClientDTO {
    private int clientId;
    private String name;
    private String lastName;
    private String incorporation;
    private String adress;
    private String postalCode;
    private String city;
    private String email;

    public ClientDTO(Client client) {
        if (client == null) {
            this.clientId = -1;
            this.name = "Client supprimé";
            this.lastName = "";
            this.incorporation = "";
            this.adress = "Inconnue";
            this.postalCode = "";
            this.city = "";
            this.email = "";
        } else {
            this.clientId = client.getClientId(); // ✅ Add this
            this.name = client.getName();
            this.lastName = client.getLastName();
            this.incorporation = client.getIncorporation();
            this.adress = client.getAdress();
            this.postalCode = client.getPostalCode();
            this.city = client.getCity();
            this.email = client.getEmail();
        }
    }

    public int getClientId() {
        return clientId;
    }

    public void setClientId(int clientId) {
        this.clientId = clientId;
    }


    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getIncorporation() {
        return incorporation;
    }

    public void setIncorporation(String incorporation) {
        this.incorporation = incorporation;
    }

    public String getAdress() {
        return adress;
    }

    public void setAdress(String adress) {
        this.adress = adress;
    }

    public String getPostalCode() {
        return postalCode;
    }

    public void setPostalCode(String postalCode) {
        this.postalCode = postalCode;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
