package com.areeb.backend.exception;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    private static final Logger log = LoggerFactory.getLogger(GlobalExceptionHandler.class);

    private static final String TIMESTAMP = "timestamp";
    private static final String MESSAGE = "message";
    private static final String STATUS = "status";

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<Map<String, Object>> handleResourceNotFoundException(ResourceNotFoundException ex) {
        log.error("Resource not found: {}", ex.getMessage());

        Map<String, Object> body = new HashMap<>();
        body.put(TIMESTAMP, LocalDateTime.now(ZoneId.of("UTC")));
        body.put(MESSAGE, ex.getMessage());
        body.put(STATUS, HttpStatus.NOT_FOUND.value());

        return new ResponseEntity<>(body, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(UserAlreadyExistsException.class)
    public ResponseEntity<Map<String, Object>> handleUserAlreadyExistsException(UserAlreadyExistsException ex) {
        log.error("User conflict: {}", ex.getMessage());

        Map<String, Object> body = new HashMap<>();
        body.put(TIMESTAMP, LocalDateTime.now(ZoneId.of("UTC")));
        body.put(MESSAGE, ex.getMessage());
        body.put(STATUS, HttpStatus.BAD_REQUEST.value());

        return new ResponseEntity<>(body, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<Map<String, Object>> handleGeneralException(Exception ex) {
        log.error("Unhandled exception occurred: ", ex);

        Map<String, Object> body = new HashMap<>();
        body.put(TIMESTAMP, LocalDateTime.now(ZoneId.of("UTC")));
        body.put(MESSAGE, "An unexpected error occurred: " + ex.getMessage());
        body.put(STATUS, HttpStatus.INTERNAL_SERVER_ERROR.value());

        return new ResponseEntity<>(body, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}