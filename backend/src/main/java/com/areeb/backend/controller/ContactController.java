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

import java.security.Principal;

@RestController
@RequestMapping("/api/contacts")
public class ContactController {

    private final ContactService contactService;

    @Autowired
    public ContactController(ContactService contactService) {
        this.contactService = contactService;
    }

    @PostMapping
    public ResponseEntity<ContactDto> createContact(Principal principal, @RequestBody ContactDto contactDto) {
        ContactDto createdContact = contactService.createContact(1L, contactDto);
        return new ResponseEntity<>(createdContact, HttpStatus.CREATED);
    }

    @PutMapping("/{contactId}")
    public ResponseEntity<ContactDto> updateContact(
            Principal principal,
            @PathVariable Long contactId,
            @RequestBody ContactDto contactDto) {
        ContactDto updatedContact = contactService.updateContact(1L, contactId, contactDto);
        return ResponseEntity.ok(updatedContact);
    }

    @DeleteMapping("/{contactId}")
    public ResponseEntity<Void> deleteContact(Principal principal, @PathVariable Long contactId) {
        contactService.deleteContact(1L, contactId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{contactId}")
    public ResponseEntity<ContactDto> getContactById(Principal principal, @PathVariable Long contactId) {
        ContactDto contactDto = contactService.getContactById(1L, contactId);
        return ResponseEntity.ok(contactDto);
    }

    @GetMapping
    public ResponseEntity<Page<ContactDto>> getAllContacts(
            Principal principal,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<ContactDto> contacts = contactService.getAllContacts(1L, pageable);
        return ResponseEntity.ok(contacts);
    }

    @GetMapping("/search")
    public ResponseEntity<Page<ContactDto>> searchContacts(
            Principal principal,
            @RequestParam String query,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<ContactDto> contacts = contactService.searchContacts(1L, query, pageable);
        return ResponseEntity.ok(contacts);
    }
}