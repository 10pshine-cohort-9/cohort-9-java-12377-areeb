package com.areeb.backend.service;

import com.areeb.backend.dto.ContactDto;
import com.areeb.backend.model.Contact;
import com.areeb.backend.model.User;
import com.areeb.backend.repository.ContactRepository;
import com.areeb.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class ContactServiceImpl implements ContactService {

    private final ContactRepository contactRepository;
    private final UserRepository userRepository;

    @Autowired
    public ContactServiceImpl(ContactRepository contactRepository, UserRepository userRepository) {
        this.contactRepository = contactRepository;
        this.userRepository = userRepository;
    }

    @Override
    public ContactDto createContact(Long userId, ContactDto contactDto) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));

        Contact contact = mapToEntity(contactDto);
        contact.setUser(user);

        Contact savedContact = contactRepository.save(contact);
        return mapToDto(savedContact);
    }

    @Override
    public ContactDto updateContact(Long userId, Long contactId, ContactDto contactDto) {
        Contact contact = contactRepository.findById(contactId)
                .orElseThrow(() -> new RuntimeException("Contact not found with id: " + contactId));

        if (!contact.getUser().getId().equals(userId)) {
            throw new RuntimeException("Unauthorized access to contact");
        }

        contact.setFirstName(contactDto.getFirstName());
        contact.setLastName(contactDto.getLastName());
        contact.setTitle(contactDto.getTitle());
        contact.setEmails(contactDto.getEmails());
        contact.setPhoneNumbers(contactDto.getPhoneNumbers());

        Contact updatedContact = contactRepository.save(contact);
        return mapToDto(updatedContact);
    }

    @Override
    public void deleteContact(Long userId, Long contactId) {
        Contact contact = contactRepository.findById(contactId)
                .orElseThrow(() -> new RuntimeException("Contact not found with id: " + contactId));

        if (!contact.getUser().getId().equals(userId)) {
            throw new RuntimeException("Unauthorized access to contact");
        }

        contactRepository.delete(contact);
    }

    @Override
    public ContactDto getContactById(Long userId, Long contactId) {
        Contact contact = contactRepository.findById(contactId)
                .orElseThrow(() -> new RuntimeException("Contact not found with id: " + contactId));

        if (!contact.getUser().getId().equals(userId)) {
            throw new RuntimeException("Unauthorized access to contact");
        }

        return mapToDto(contact);
    }

    @Override
    public Page<ContactDto> getAllContacts(Long userId, Pageable pageable) {
        Page<Contact> contacts = contactRepository.findByUserId(userId, pageable);
        return contacts.map(this::mapToDto);
    }

    @Override
    public Page<ContactDto> searchContacts(Long userId, String query, Pageable pageable) {
        Page<Contact> contacts = contactRepository
                .findByUserIdAndFirstNameContainingIgnoreCaseOrUserIdAndLastNameContainingIgnoreCase(
                        userId, query, userId, query, pageable);
        return contacts.map(this::mapToDto);
    }

    private ContactDto mapToDto(Contact contact) {
        return new ContactDto(
                contact.getId(),
                contact.getFirstName(),
                contact.getLastName(),
                contact.getTitle(),
                contact.getEmails(),
                contact.getPhoneNumbers()
        );
    }

    private Contact mapToEntity(ContactDto contactDto) {
        Contact contact = new Contact();
        contact.setId(contactDto.getId());
        contact.setFirstName(contactDto.getFirstName());
        contact.setLastName(contactDto.getLastName());
        contact.setTitle(contactDto.getTitle());
        contact.setEmails(contactDto.getEmails());
        contact.setPhoneNumbers(contactDto.getPhoneNumbers());
        return contact;
    }
}