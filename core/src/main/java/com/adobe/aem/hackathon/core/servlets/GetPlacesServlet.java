package com.adobe.aem.hackathon.core.servlets;

import com.adobe.aem.hackathon.core.services.CommonService;
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
import org.json.JSONObject;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.servlet.Servlet;
import javax.servlet.ServletException;
import java.io.IOException;
import java.io.InputStream;

@Component(service = Servlet.class, property = { "sling.servlet.paths=/bin/hackathon/placeslist",
		"sling.servlet.method=" + HttpConstants.METHOD_GET, "sling.servlet.extensions=json" })
public class GetPlacesServlet extends SlingSafeMethodsServlet {

	private static final long serialVersionUID = 4016057296495129474L;
	private static final Logger LOG = LoggerFactory.getLogger(GetPlacesServlet.class);

	@Reference
	private CommonService commonService;

	protected void doGet(SlingHttpServletRequest request, SlingHttpServletResponse response)
			throws ServletException, IOException {

		LOG.debug("inside Places Servlet  doGET method");
		try {

				JSONObject itemsObj = commonService.getPlaceDetails();
				//String restId = request.getParameter("areaId");
				//JSONArray itemsArr = itemsObj.getJSONArray("items") ;



				LOG.debug("data List is {}", itemsObj.toString());
				response.setContentType("application/json");
				response.getWriter().write(itemsObj.toString());

			}
		catch (Exception e) {
			LOG.error(" Error while while getting Places list. Error={}", e);
		}


	}


}