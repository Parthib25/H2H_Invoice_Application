package com.highradius.servlets;

import java.io.IOException;
import java.util.List;

import com.google.gson.Gson;
import com.highradius.model.*;
import com.highradius.implementation.*;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/read")
public class ReadServlet extends HttpServlet {
	 /**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	@Override
	    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
		 String id = request.getParameter("id");
	        List<Invoice> invoices = getInvoices(id);

	        Gson gson = new Gson();
	        String json = gson.toJson(invoices);

	    
            response.setContentType("application/json");
	        response.setCharacterEncoding("UTF-8");

	        
	        response.getWriter().write(json);
	    }
	   private List<Invoice> getInvoices(String id) {
	       
	        InvoiceDaoImpl invoiceDao = new InvoiceDaoImpl();

	        
	        return invoiceDao.getInvoices(id);
	    }
	}

