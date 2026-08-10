package com.areeb.backend.model;

import jakarta.persistence.*;
import java.util.Map;

@Entity
@Table(name = "contacts")
public class Contact {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String firstName;

    private String lastName;

    private String title;

    @ElementCollection
    @CollectionTable(name = "contact_emails", joinColumns = @JoinColumn(name = "contact_id"))
    @MapKeyColumn(name = "email_label")
    @Column(name = "email_address")
    private Map<String, String> emails; // e.g., "work" -> "john@work.com"

    @ElementCollection
    @CollectionTable(name = "contact_phone_numbers", joinColumns = @JoinColumn(name = "contact_id"))
    @MapKeyColumn(name = "phone_label")
    @Column(name = "phone_number")
    private Map<String, String> phoneNumbers; // e.g., "personal" -> "555-0192"

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getFirstName() { return firstName; }
    public void setFirstName(String firstName) { this.firstName = firstName; }

    public String getLastName() { return lastName; }
    public void setLastName(String lastName) { this.lastName = lastName; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public Map<String, String> getEmails() { return emails; }
    public void setEmails(Map<String, String> emails) { this.emails = emails; }

    public Map<String, String> getPhoneNumbers() { return phoneNumbers; }
    public void setPhoneNumbers(Map<String, String> phoneNumbers) { this.phoneNumbers = phoneNumbers; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
}