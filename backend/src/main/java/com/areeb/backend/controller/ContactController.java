package com.areeb.backend.controller;

import com.areeb.backend.dto.ContactDto;
import com.areeb.backend.service.ContactService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/contacts")
public class ContactController {

    private final ContactService contactService;

    @Autowired
    public ContactController(ContactService contactService) {
        this.contactService = contactService;
    }

    @PostMapping("/user/{userId}")
    public ResponseEntity<ContactDto> createContact(@PathVariable Long userId, @RequestBody ContactDto contactDto) {
        ContactDto createdContact = contactService.createContact(userId, contactDto);
        return new ResponseEntity<>(createdContact, HttpStatus.CREATED);
    }

    @PutMapping("/user/{userId}/{contactId}")
    public ResponseEntity<ContactDto> updateContact(
            @PathVariable Long userId,
            @PathVariable Long contactId,
            @RequestBody ContactDto contactDto) {
        ContactDto updatedContact = contactService.updateContact(userId, contactId, contactDto);
        return ResponseEntity.ok(updatedContact);
    }

    @DeleteMapping("/user/{userId}/{contactId}")
    public ResponseEntity<Void> deleteContact(@PathVariable Long userId, @PathVariable Long contactId) {
        contactService.deleteContact(userId, contactId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/user/{userId}/{contactId}")
    public ResponseEntity<ContactDto> getContactById(@PathVariable Long userId, @PathVariable Long contactId) {
        ContactDto contactDto = contactService.getContactById(userId, contactId);
        return ResponseEntity.ok(contactDto);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<Page<ContactDto>> getAllContacts(
            @PathVariable Long userId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<ContactDto> contacts = contactService.getAllContacts(userId, pageable);
        return ResponseEntity.ok(contacts);
    }

    @GetMapping("/user/{userId}/search")
    public ResponseEntity<Page<ContactDto>> searchContacts(
            @PathVariable Long userId,
            @RequestParam String query,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<ContactDto> contacts = contactService.searchContacts(userId, query, pageable);
        return ResponseEntity.ok(contacts);
    }
}