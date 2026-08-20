package com.areeb.backend.service;

import com.areeb.backend.dto.ContactDto;
import com.areeb.backend.exception.ResourceNotFoundException;
import com.areeb.backend.model.Contact;
import com.areeb.backend.model.User;
import com.areeb.backend.repository.ContactRepository;
import com.areeb.backend.repository.UserRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@Service
public class ContactExportImportServiceImpl implements ContactExportImportService {

    private final ContactRepository contactRepository;
    private final UserRepository userRepository;
    private final ObjectMapper objectMapper;

    @Autowired
    public ContactExportImportServiceImpl(ContactRepository contactRepository, UserRepository userRepository) {
        this.contactRepository = contactRepository;
        this.userRepository = userRepository;
        this.objectMapper = new ObjectMapper();
    }

    @Override
    public String exportContactsToJson(Long userId) {
        List<Contact> contacts = contactRepository.findByUserId(userId);
        List<ContactDto> contactDtos = new ArrayList<>();

        for (Contact contact : contacts) {
            ContactDto dto = new ContactDto(
                    contact.getId(),
                    contact.getFirstName(),
                    contact.getLastName(),
                    contact.getTitle(),
                    contact.getEmails() != null ? contact.getEmails() : new HashMap<>(),
                    contact.getPhoneNumbers() != null ? contact.getPhoneNumbers() : new HashMap<>()
            );
            contactDtos.add(dto);
        }

        try {
            return objectMapper.writerWithDefaultPrettyPrinter().writeValueAsString(contactDtos);
        } catch (Exception e) {
            throw new IllegalArgumentException("Failed to export contacts: " + e.getMessage(), e);
        }
    }

    @Override
    @Transactional
    public void importContactsFromJson(Long userId, String jsonContent) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));

        try {
            List<ContactDto> contactDtos = objectMapper.readValue(jsonContent, new TypeReference<>() {});

            for (ContactDto dto : contactDtos) {
                Contact contact = new Contact();
                contact.setFirstName(dto.getFirstName());
                contact.setLastName(dto.getLastName());
                contact.setTitle(dto.getTitle());
                contact.setEmails(dto.getEmails() != null ? dto.getEmails() : new HashMap<>());
                contact.setPhoneNumbers(dto.getPhoneNumbers() != null ? dto.getPhoneNumbers() : new HashMap<>());
                contact.setUser(user);

                contactRepository.save(contact);
            }
        } catch (JsonProcessingException e) {
            throw new IllegalArgumentException("Invalid JSON format for contact import: " + e.getMessage(), e);
        }
    }
}

// Updated for final review verification