package com.areeb.backend;

import com.areeb.backend.controller.ContactController;
import com.areeb.backend.dto.ContactDto;
import com.areeb.backend.service.ContactService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ContactControllerTest {

    @Mock
    private ContactService contactService;

    @InjectMocks
    private ContactController contactController;

    @Test
    void createContact_Success() {
        ContactDto dto = new ContactDto();
        dto.setFirstName("John");

        when(contactService.createContact(eq(1L), any(ContactDto.class))).thenReturn(dto);

        ResponseEntity<ContactDto> response = contactController.createContact(1L, dto);

        assertNotNull(response);
        assertEquals(HttpStatus.CREATED, response.getStatusCode());
        assertEquals("John", response.getBody().getFirstName());
    }
}