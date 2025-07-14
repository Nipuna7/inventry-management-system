package com.nipuna.ims.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.*;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // This exposes the /uploads/** URL to serve images
        registry.addResourceHandler("/uploads/**")
                .addResourceLocations("file:uploads/");
    }
}
