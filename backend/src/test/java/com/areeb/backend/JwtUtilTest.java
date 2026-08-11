package com.areeb.backend;

import com.areeb.backend.security.JwtUtil;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.test.util.ReflectionTestUtils;

import static org.junit.jupiter.api.Assertions.*;

class JwtUtilTest {

    private JwtUtil jwtUtil;

    @BeforeEach
    void setUp() {
        jwtUtil = new JwtUtil();
        // Inject secret key and expiration time for tests
        ReflectionTestUtils.setField(jwtUtil, "secret", "mySuperSecretKeyForJwtSigning12345678901234567890");
        ReflectionTestUtils.setField(jwtUtil, "expiration", 3600000L);
    }

    @Test
    void testGenerateTokenAndExtractUsername() {
        String username = "areeb";
        String token = jwtUtil.generateToken(username);

        assertNotNull(token);
        assertEquals(username, jwtUtil.extractUsername(token));
    }

    @Test
    void testIsTokenValid_ValidUser() {
        String username = "areeb";
        String token = jwtUtil.generateToken(username);

        assertTrue(jwtUtil.isTokenValid(token, username));
    }

    @Test
    void testIsTokenValid_InvalidUser() {
        String username = "areeb";
        String token = jwtUtil.generateToken(username);

        assertFalse(jwtUtil.isTokenValid(token, "wrong_user"));
    }
}