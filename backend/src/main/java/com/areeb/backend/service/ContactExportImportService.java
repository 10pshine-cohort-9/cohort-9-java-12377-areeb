package com.areeb.backend.service;

import com.areeb.backend.dto.ContactDto;
import java.util.List;

public interface ContactExportImportService {
    String exportContactsToJson(Long userId);
    void importContactsFromJson(Long userId, String jsonContent);
}