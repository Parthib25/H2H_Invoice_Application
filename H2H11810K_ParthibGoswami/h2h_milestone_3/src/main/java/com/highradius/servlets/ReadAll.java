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

@WebServlet("/readAll")
public class ReadAll extends HttpServlet {
    /**
	 * 
	 */
	private static final long serialVersionUID = 8L;

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
       
        List<Invoice> invoices = getInvoice();

        Gson gson = new Gson();
        String json = gson.toJson(invoices);

        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Methods", "GET");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type");
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        response.getWriter().write(json);
    }

    private List<Invoice> getInvoice() {
        InvoiceDaoImpl invoiceDao = new InvoiceDaoImpl();
        return invoiceDao.getAllInvoices();
    }
}
