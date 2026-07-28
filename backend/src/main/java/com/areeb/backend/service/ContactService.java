package com.areeb.backend.service;

import com.areeb.backend.dto.ContactDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ContactService {

    ContactDto createContact(Long userId, ContactDto contactDto);

    ContactDto updateContact(Long userId, Long contactId, ContactDto contactDto);

    void deleteContact(Long userId, Long contactId);

    ContactDto getContactById(Long userId, Long contactId);

    Page<ContactDto> getAllContacts(Long userId, Pageable pageable);

    Page<ContactDto> searchContacts(Long userId, String query, Pageable pageable);
}