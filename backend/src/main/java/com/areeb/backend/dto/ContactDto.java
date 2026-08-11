package com.areeb.backend.dto;

import java.util.HashMap;
import java.util.List;
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

    // Flexible setter supporting both Map and legacy List/Array formats
    @SuppressWarnings("unchecked")
    public void setEmails(Object emailsObj) {
        if (emailsObj instanceof Map) {
            this.emails = (Map<String, String>) emailsObj;
        } else if (emailsObj instanceof List) {
            this.emails = new HashMap<>();
            List<?> list = (List<?>) emailsObj;
            for (int i = 0; i < list.size(); i++) {
                this.emails.put("email" + (i + 1), String.valueOf(list.get(i)));
            }
        }
    }

    public Map<String, String> getPhoneNumbers() {
        return phoneNumbers;
    }

    // Flexible setter supporting both Map and legacy List/Array formats
    @SuppressWarnings("unchecked")
    public void setPhoneNumbers(Object phoneNumbersObj) {
        if (phoneNumbersObj instanceof Map) {
            this.phoneNumbers = (Map<String, String>) phoneNumbersObj;
        } else if (phoneNumbersObj instanceof List) {
            this.phoneNumbers = new HashMap<>();
            List<?> list = (List<?>) phoneNumbersObj;
            for (int i = 0; i < list.size(); i++) {
                this.phoneNumbers.put("phone" + (i + 1), String.valueOf(list.get(i)));
            }
        }
    }
}