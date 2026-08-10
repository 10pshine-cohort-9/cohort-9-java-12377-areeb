package com.areeb.backend.dto;

import java.util.Map;

public class ContactDto {

    private Long id;
    private String firstName;
    private String lastName;
    private String title;
    private Map<String, String> emails;
    private Map<String, String> phoneNumbers;

    public ContactDto() {
    }

    public ContactDto(Long id, String firstName, String lastName, String title, Map<String, String> emails, Map<String, String> phoneNumbers) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.title = title;
        this.emails = emails;
        this.phoneNumbers = phoneNumbers;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Map<String, String> getEmails() {
        return emails;
    }

    public void setEmails(Map<String, String> emails) {
        this.emails = emails;
    }

    public Map<String, String> getPhoneNumbers() {
        return phoneNumbers;
    }

    public void setPhoneNumbers(Map<String, String> phoneNumbers) {
        this.phoneNumbers = phoneNumbers;
    }
}