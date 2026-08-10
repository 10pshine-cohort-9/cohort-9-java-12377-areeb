package com.areeb.backend;

import com.areeb.backend.model.Contact;
import com.areeb.backend.model.User;
import com.areeb.backend.repository.ContactRepository;
import com.areeb.backend.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;

@SpringBootTest
@ActiveProfiles("test")
@Transactional
class ContactRepositoryTest {

    @Autowired
    private ContactRepository contactRepository;

    @Autowired
    private UserRepository userRepository;

    @Test
    void testSaveAndFindByUserId() {
        User user = new User();
        user.setUsername("contact_owner");
        user.setEmail("owner@example.com");
        user.setPassword("password");
        user = userRepository.save(user);

        Contact contact = new Contact();
        contact.setFirstName("Alice");
        contact.setLastName("Smith");
        contact.setUser(user);

        contactRepository.save(contact);

        List<Contact> contacts = contactRepository.findByUserId(user.getId());
        assertFalse(contacts.isEmpty());
        assertEquals("Alice", contacts.getFirst().getFirstName());
    }
}