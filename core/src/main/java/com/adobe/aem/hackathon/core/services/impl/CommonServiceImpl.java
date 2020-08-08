package com.adobe.aem.hackathon.core.services.impl;

import com.adobe.aem.hackathon.core.config.CommonServiceConfig;
import com.adobe.aem.hackathon.core.services.CommonService;
import com.day.cq.dam.api.Asset;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ResourceResolverFactory;
import org.json.JSONArray;
import org.json.JSONObject;
import org.osgi.service.component.annotations.Activate;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.InputStream;
import java.util.HashMap;
import java.util.Map;

@Component(immediate = true,enabled = true,service = CommonService.class)
public class CommonServiceImpl implements CommonService {

    private static final Logger LOG = LoggerFactory.getLogger(CommonServiceImpl.class);

    @Activate
    private CommonServiceConfig config;

    @Reference
    ResourceResolverFactory resourceResolverFactory;

    @Override
    public JSONObject getPlaceDetails() {
        JSONObject placeDet = new JSONObject();
        Resource original;
        try {

            Map<String, Object> param = new HashMap<String, Object>();
            param.put(ResourceResolverFactory.SUBSERVICE, "userName");
            ResourceResolver resourceResolver = resourceResolverFactory.getServiceResourceResolver(param);
            Resource resource = resourceResolver.getResource(config.getPlaceDetailsPath_String());
            Asset asset = resource.adaptTo(Asset.class);
            original = asset.getOriginal();
            InputStream content = original.adaptTo(InputStream.class);
            ObjectMapper objectMapper = new ObjectMapper();
            JsonNode jsonNode = objectMapper.readValue(content,JsonNode.class);
            placeDet = new JSONObject(jsonNode.toString());
        }
        catch (Exception e) {
            LOG.error("error while executing getPlaceDetails() method. Error={}" + e);
        }

        return placeDet;
    }
}
