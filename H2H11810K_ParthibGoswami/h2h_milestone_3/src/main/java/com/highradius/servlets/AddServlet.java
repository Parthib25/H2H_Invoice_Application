package com.highradius.servlets;
import com.google.gson.Gson;
import com.highradius.implementation.InvoiceDaoImpl;
import com.google.gson.*;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import java.io.BufferedReader;
import java.io.IOException;

@WebServlet("/addInvoice")
public class AddServlet extends HttpServlet {

    /**
	 * 
	 */
	private static final long serialVersionUID = 2L;
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
        // Read the request parameters for invoice data
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
	        String cust_id=jsonObject.get("cust_id").getAsString();
	    	String sales=jsonObject.get("sales_org").getAsString();
	    	String dis=jsonObject.get("dis").getAsString();
	    	String comp_i=jsonObject.get("comp").getAsString();
	    	String order=jsonObject.get("order").getAsString();
	   		String order_curr=jsonObject.get("order_curr").getAsString();
	   		String cus_no=jsonObject.get("cus_no").getAsString();
	   		String amount_f=jsonObject.get("amount").getAsString();
	   		
	   		
	   
	    
    	
   		
        int sales_org=Integer.parseInt(sales);
       
        int comp=Integer.parseInt(comp_i);
     
       
   
        float amount=Float.parseFloat(amount_f);
        
 
        boolean isSuccess = insertInvoice(cust_id,sales_org,dis,comp,order,order_curr,cus_no,amount);
        response.getWriter().write(isSuccess ? "Invoice added successfully" : "Failed to add invoice");
	    }
		}catch(Exception e) {
			System.out.println(e);
		}
    }

    private boolean insertInvoice(String cust_order_id, int sales_org, String dis, int comp, String order, String order_curr,
            String cust_no, float order_amount) {
       
        InvoiceDaoImpl invoiceDao = new InvoiceDaoImpl();

       
        return invoiceDao.insertInvoice(cust_order_id,sales_org,dis,comp,order,order_curr,cust_no,order_amount);
    }
}
