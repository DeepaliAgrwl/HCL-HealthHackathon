package com.adobe.aem.hackathon.core.config;

import org.osgi.service.metatype.annotations.AttributeDefinition;
import org.osgi.service.metatype.annotations.AttributeType;
import org.osgi.service.metatype.annotations.ObjectClassDefinition;

@ObjectClassDefinition
public @interface CommonServiceConfig {

    String placeDetailsPath = "/content/dam/hackathon/placesdata.json";

    @AttributeDefinition(name = "Place Details JSON", description = "This is for getting the  Place Details", defaultValue = placeDetailsPath,type = AttributeType.STRING)
    String getPlaceDetailsPath_String() default placeDetailsPath;
}