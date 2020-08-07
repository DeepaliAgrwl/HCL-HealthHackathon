package com.adobe.aem.hackathon.core.servlets;

import com.day.cq.dam.api.Asset;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.servlets.HttpConstants;
import org.apache.sling.api.servlets.SlingSafeMethodsServlet;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.osgi.service.component.annotations.Component;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.servlet.Servlet;
import javax.servlet.ServletException;
import java.io.IOException;
import java.io.InputStream;
import java.util.HashMap;
import java.util.Map;

@Component(service = Servlet.class, property = { "sling.servlet.paths=/bin/hackathon/citylist",
		"sling.servlet.method=" + HttpConstants.METHOD_GET, "sling.servlet.extensions=json" })
public class GetCityServlet extends SlingSafeMethodsServlet {

	private static final long serialVersionUID = 4016057296495129474L;
	private static final Logger LOG = LoggerFactory.getLogger(GetCityServlet.class);


	protected void doGet(SlingHttpServletRequest request, SlingHttpServletResponse response)
			throws ServletException, IOException {

		LOG.debug("inside CountryState Servlet  doGET method");
		try {

			//JSONArray cityList = new JSONArray();
			JSONObject dataList = new JSONObject();
			Resource original;
			//JSONArray response = new JSONArray();

				ResourceResolver resourceResolver = request.getResourceResolver();
				Resource resource = resourceResolver.getResource("/content/dam/hackathon/city.json");
				Asset asset = resource.adaptTo(Asset.class);
				original = asset.getOriginal();
				InputStream content = original.adaptTo(InputStream.class);
				ObjectMapper objectMapper = new ObjectMapper();
				JsonNode jsonNode = objectMapper.readValue(content,JsonNode.class);
				dataList = new JSONObject(jsonNode.toString());
				response.setContentType("application/json");
				response.getWriter().write(dataList.toString());

			}
		catch (Exception e) {
			LOG.error(" Error while while getting country State list. Error={}", e);
		}


	}


}