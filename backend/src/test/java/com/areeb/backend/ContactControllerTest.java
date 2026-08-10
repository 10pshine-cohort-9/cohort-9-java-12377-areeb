package com.areeb.backend;

import com.areeb.backend.controller.ContactController;
import com.areeb.backend.dto.ContactDto;
import com.areeb.backend.model.User;
import com.areeb.backend.repository.UserRepository;
import com.areeb.backend.service.ContactService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.security.Principal;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ContactControllerTest {

    @Mock
    private ContactService contactService;

    @Mock
    private UserRepository userRepository;

    @Mock
    private Principal principal;

    @InjectMocks
    private ContactController contactController;

    @Test
    void createContact_Success() {
        ContactDto dto = new ContactDto();
        dto.setFirstName("John");

        when(principal.getName()).thenReturn("testuser");

        User mockUser = new User();
        mockUser.setId(1L);
        mockUser.setUsername("testuser");
        when(userRepository.findByUsername("testuser")).thenReturn(Optional.of(mockUser));

        when(contactService.createContact(eq(1L), any(ContactDto.class))).thenReturn(dto);

        ResponseEntity<ContactDto> response = contactController.createContact(principal, dto);

        assertNotNull(response);
        assertEquals(HttpStatus.CREATED, response.getStatusCode());
        assertNotNull(response.getBody());
        assertEquals("John", response.getBody().getFirstName());
    }
}