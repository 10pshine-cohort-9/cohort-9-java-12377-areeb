package com.areeb.backend.service;

import com.areeb.backend.dto.ContactDto;
import com.areeb.backend.exception.ResourceNotFoundException;
import com.areeb.backend.model.Contact;
import com.areeb.backend.model.User;
import com.areeb.backend.repository.ContactRepository;
import com.areeb.backend.repository.UserRepository;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
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

        for (int i = 0; i < contacts.size(); i++) {
            Contact contact = contacts.get(i);
            ContactDto dto = new ContactDto(
                    contact.getId(),
                    contact.getFirstName(),
                    contact.getLastName(),
                    contact.getTitle(),
                    contact.getEmails(),
                    contact.getPhoneNumbers()
            );
            contactDtos.add(dto);
        }

        try {
            return objectMapper.writerWithDefaultPrettyPrinter().writeValueAsString(contactDtos);
        } catch (Exception e) {
            throw new RuntimeException("Failed to export contacts: " + e.getMessage());
        }
    }

    @Override
    public void importContactsFromJson(Long userId, String jsonContent) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));

        try {
            List<ContactDto> contactDtos = objectMapper.readValue(jsonContent, new TypeReference<List<ContactDto>>() {});

            for (int i = 0; i < contactDtos.size(); i++) {
                ContactDto dto = contactDtos.get(i);
                Contact contact = new Contact();
                contact.setFirstName(dto.getFirstName());
                contact.setLastName(dto.getLastName());
                contact.setTitle(dto.getTitle());
                contact.setEmails(dto.getEmails());
                contact.setPhoneNumbers(dto.getPhoneNumbers());
                contact.setUser(user);

                contactRepository.save(contact);
            }
        } catch (Exception e) {
            throw new RuntimeException("Failed to import contacts: " + e.getMessage());
        }
    }
}