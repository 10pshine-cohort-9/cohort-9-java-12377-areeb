package com.areeb.backend.service;

public interface ContactExportImportService {
    String exportContactsToJson(Long userId);
    void importContactsFromJson(Long userId, String jsonContent);
}