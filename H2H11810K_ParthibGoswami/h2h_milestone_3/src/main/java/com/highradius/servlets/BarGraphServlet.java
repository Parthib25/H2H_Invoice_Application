package com.highradius.servlets;

import com.google.gson.Gson;
import com.highradius.implementation.InvoiceDaoImpl;
import com.highradius.model.DistributionChannelTotal;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

@WebServlet("/bargraph")
public class BarGraphServlet extends HttpServlet {

    private static final long serialVersionUID = 1L;

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
    	List<DistributionChannelTotal>  distributionChannelTotals = getTotalOrderAmountByDistributionChannel();

    	 Gson gson = new Gson();
         String json = gson.toJson(distributionChannelTotals);
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Methods", "GET");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type");
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        response.getWriter().write(json);
    }

    private List<DistributionChannelTotal> getTotalOrderAmountByDistributionChannel() {
        InvoiceDaoImpl invoiceDao = new InvoiceDaoImpl();
        return invoiceDao.getTotalOrderAmountByDistributionChannel();
    }
}
