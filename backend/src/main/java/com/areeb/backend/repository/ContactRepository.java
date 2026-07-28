package com.areeb.backend.repository;

import com.areeb.backend.model.Contact;
<<<<<<< HEAD
=======
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
>>>>>>> feature/contact-management
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ContactRepository extends JpaRepository<Contact, Long> {
    List<Contact> findByUserId(Long userId);
<<<<<<< HEAD
=======

    Page<Contact> findByUserId(Long userId, Pageable pageable);

    Page<Contact> findByUserIdAndFirstNameContainingIgnoreCaseOrUserIdAndLastNameContainingIgnoreCase(
            Long userId1, String firstName, Long userId2, String lastName, Pageable pageable);
>>>>>>> feature/contact-management
}