package com.highradius.servlets;

import com.highradius.implementation.InvoiceDaoImpl;
import com.google.gson.*;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import java.io.BufferedReader;
import java.io.IOException;

@WebServlet("/deleteInvoice")
public class DeleteServlet extends HttpServlet {

    /**
 * 
 */
private static final long serialVersionUID = -738081500687530493L;

   @Override
   protected void doOptions(HttpServletRequest request, HttpServletResponse response) throws IOException {
	   response.setHeader("Access-Control-Allow-Origin", "*");
       response.setHeader("Access-Control-Allow-Methods", "POST,OPTIONS");
       response.setHeader("Access-Control-Allow-Headers", "Content-Type");
       response.setContentType("application/json");
       response.setStatus(HttpServletResponse.SC_OK);
       response.setCharacterEncoding("UTF-8");
}@Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
       doOptions(request,response);
       try {
    	   BufferedReader reader = request.getReader();
           StringBuilder requestBodyContent = new StringBuilder();
           String line;
           while ((line = reader.readLine()) != null) {
               requestBodyContent.append(line);
           }
           Gson gson = new Gson();
           JsonElement jsonElement = gson.fromJson(requestBodyContent.toString(), JsonElement.class);
           if (jsonElement.isJsonObject()) {
               JsonObject jsonObject = jsonElement.getAsJsonObject();
               String no = jsonObject.get("no").getAsString();

               // Call the method to delete the invoice
               boolean isSuccess = deleteInvoice(no);


               response.getWriter().write(isSuccess ? "Invoice deleted successfully" : "Failed to delete invoice");
            response.setStatus(200);
        
       }}catch (Exception  e) {
    	   System.out.println(e);
       }
    }

    private boolean deleteInvoice(String id) {
        // Create an instance of the InvoiceDaoImpl class
        InvoiceDaoImpl invoiceDao = new InvoiceDaoImpl();

        // Call the method to delete the invoice
        return invoiceDao.deleteInvoice(id);
    }
}
