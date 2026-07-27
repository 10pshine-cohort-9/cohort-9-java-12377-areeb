package com.areeb.backend.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.Optional;

@Component
public class JwtUtil {

    @Value("${jwt.secret}")
    private String secret;

    @Value("${jwt.expiration:36000000}")
    private Long expiration;

    private SecretKey key;

    @PostConstruct
    public void init() {
        if (secret != null && !secret.isBlank()) {
            this.key = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
        }
    }

    private SecretKey getSigningKey() {
        if (key == null && secret != null && !secret.isBlank()) {
            this.key = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
        }
        return key;
    }

    public String generateToken(String username) {
        long expMillis = (expiration != null) ? expiration : 36000000L;
        return Jwts.builder()
                .subject(username)
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + expMillis))
                .signWith(getSigningKey())
                .compact();
    }

    public Optional<Claims> getClaims(String token) {
        try {
            Claims claims = Jwts.parser()
                    .verifyWith(getSigningKey())
                    .build()
                    .parseSignedClaims(token)
                    .getPayload();
            return Optional.of(claims);
        } catch (JwtException | IllegalArgumentException e) {
            return Optional.empty();
        }
    }

    public String extractUsername(String token) {
        return getClaims(token).map(Claims::getSubject).orElse(null);
    }

    public boolean isTokenValid(String token, String username) {
        return getClaims(token)
                .map(claims -> {
                    String extractedUser = claims.getSubject();
                    Date exp = claims.getExpiration();
                    boolean isNotExpired = exp != null && exp.after(new Date());
                    return extractedUser.equals(username) && isNotExpired;
                })
                .orElse(false);
    }
}