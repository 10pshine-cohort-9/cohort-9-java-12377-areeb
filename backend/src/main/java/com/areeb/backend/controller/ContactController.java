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
import org.springframework.web.server.ResponseStatusException;

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
        try {
            ContactDto createdContact = contactService.createContact(1L, contactDto);
            return new ResponseEntity<>(createdContact, HttpStatus.CREATED);
        } catch (RuntimeException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        }
    }

    @PutMapping("/{contactId}")
    public ResponseEntity<ContactDto> updateContact(
            Principal principal,
            @PathVariable Long contactId,
            @RequestBody ContactDto contactDto) {
        try {
            ContactDto updatedContact = contactService.updateContact(1L, contactId, contactDto);
            return ResponseEntity.ok(updatedContact);
        } catch (RuntimeException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage());
        }
    }

    @DeleteMapping("/{contactId}")
    public ResponseEntity<Void> deleteContact(Principal principal, @PathVariable Long contactId) {
        try {
            contactService.deleteContact(1L, contactId);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage());
        }
    }

    @GetMapping("/{contactId}")
    public ResponseEntity<ContactDto> getContactById(Principal principal, @PathVariable Long contactId) {
        try {
            ContactDto contactDto = contactService.getContactById(1L, contactId);
            return ResponseEntity.ok(contactDto);
        } catch (RuntimeException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<Page<ContactDto>> getAllContacts(
            Principal principal,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        try {
            Pageable pageable = PageRequest.of(page, size);
            Page<ContactDto> contacts = contactService.getAllContacts(1L, pageable);
            return ResponseEntity.ok(contacts);
        } catch (RuntimeException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        }
    }

    @GetMapping("/search")
    public ResponseEntity<Page<ContactDto>> searchContacts(
            Principal principal,
            @RequestParam String query,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        try {
            Pageable pageable = PageRequest.of(page, size);
            Page<ContactDto> contacts = contactService.searchContacts(1L, query, pageable);
            return ResponseEntity.ok(contacts);
        } catch (RuntimeException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        }
    }
}