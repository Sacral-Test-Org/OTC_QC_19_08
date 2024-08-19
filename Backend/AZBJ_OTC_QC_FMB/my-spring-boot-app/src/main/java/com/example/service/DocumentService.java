package com.example.service;

import com.example.dao.DocumentDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DocumentService {

    @Autowired
    private DocumentDao documentDao;

    public int countSelectedRecords() {
        return documentDao.countSelectedRecords();
    }

    public String generateDocumentURL(String applicationNumber) {
        return documentDao.generateDocumentURL(applicationNumber);
    }
}
