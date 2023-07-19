package com.highradius.servlets;

import com.google.gson.Gson;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.highradius.implementation.InvoiceDaoImpl;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import java.io.BufferedReader;
import java.io.IOException;

@WebServlet("/editInvoice")
public class EditServlet extends HttpServlet {

    private static final long serialVersionUID = -8015246949526744587L;
    @Override
    protected void doOptions(HttpServletRequest request, HttpServletResponse response) throws IOException {
    	 response.setHeader("Access-Control-Allow-Origin", "*");
         response.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
         response.setHeader("Access-Control-Allow-Headers", "Content-Type");
         response.setContentType("application/json");
         response.setStatus(HttpServletResponse.SC_OK);
         response.setCharacterEncoding("UTF-8");
    }
    @Override
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
        if (jsonElement != null && jsonElement.isJsonObject()) {
            JsonObject jsonObject = jsonElement.getAsJsonObject();
            String sl_no = jsonObject.get("sl_no").getAsString();
            String value1 = jsonObject.get("value1").getAsString();
            int value2 = jsonObject.get("value2").getAsInt();
            String value3 = jsonObject.get("value3").getAsString();

            int sl_noInt = Integer.parseInt(sl_no);

            boolean isSuccess = updateInvoiceNew(sl_noInt ,"ORDER_CURRENCY","COMPANY_CODE","DISTRIBUTION_CHANNEL", value1, value2, value3);

            // Write the success or failure response to the HttpServletResponse
            response.getWriter().write(isSuccess ? "Invoice updated successfully" : "Failed to update invoice");
            response.setStatus(200);
        } else {
            // Handle the case where the JSON is not valid or the request body is empty
            response.getWriter().write("Invalid JSON or empty request body");
        }
        }catch(Exception e){
        	
        }
    }

    private boolean updateInvoiceNew(int sl_no, String column1, String column2, String column3, String value1, int value2, String value3) {
        // Create an instance of the InvoiceDaoImpl class
        InvoiceDaoImpl invoiceDao = new InvoiceDaoImpl();

        // Call the method to update the invoice
        return invoiceDao.updateInvoiceNew(sl_no, column1, column2, column3, value1, value2, value3);
    }
}
