package com.example;

import com.google.common.collect.ImmutableList;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;

public class Application {
    private static final Logger logger = LoggerFactory.getLogger(Application.class);
    
    public static void main(String[] args) throws Exception {
        logger.info("Starting Java Gradle Example Application");
        
        // Use Guava
        List<String> items = ImmutableList.of("Apple", "Banana", "Cherry");
        logger.info("Items: {}", items);
        
        // Use Jackson
        ObjectMapper mapper = new ObjectMapper();
        String json = mapper.writeValueAsString(items);
        logger.info("JSON: {}", json);
        
        logger.info("Application completed successfully");
    }
}
