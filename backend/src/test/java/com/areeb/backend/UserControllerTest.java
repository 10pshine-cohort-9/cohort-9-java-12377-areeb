package com.areeb.backend;

import com.areeb.backend.controller.UserController;
import com.areeb.backend.dto.ChangePasswordRequest;
import com.areeb.backend.dto.UserProfileResponse;
import com.areeb.backend.service.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class UserControllerTest {

    @Mock
    private UserService userService;

    @InjectMocks
    private UserController userController;

    private Authentication authentication;

    @BeforeEach
    void setUp() {
        authentication = mock(Authentication.class);
    }

    @Test
    void testGetCurrentUserSuccess() {
        when(authentication.getName()).thenReturn("testuser");

        UserProfileResponse profileResponse = new UserProfileResponse();
        profileResponse.setUsername("testuser");
        profileResponse.setEmail("test@example.com");

        when(userService.getUserProfile("testuser")).thenReturn(profileResponse);

        ResponseEntity<UserProfileResponse> response = userController.getCurrentUser(authentication);

        assertNotNull(response);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(profileResponse, response.getBody());
        verify(userService).getUserProfile("testuser");
    }

    @Test
    void testChangePasswordSuccess() {
        when(authentication.getName()).thenReturn("testuser");
        ChangePasswordRequest request = new ChangePasswordRequest("oldPass", "newPass");

        ResponseEntity<String> response = userController.changePassword(authentication, request);

        assertNotNull(response);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("Password changed successfully", response.getBody());
        verify(userService).changePassword("testuser", request);
    }
}