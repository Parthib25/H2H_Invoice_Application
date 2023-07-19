package com.highradius.implementation;

import com.highradius.model.DistributionChannelTotal;
import com.highradius.model.Invoice;

import java.util.List;
public interface InvoiceDao {
	List<Invoice> getInvoices(String cust_order_id);
    
	List<Invoice> getAllInvoices();
	boolean insertInvoice(String cust_order_id, int sales_org, String dis, int comp, String order, String order_curr,
            String cust_no, float order_amount);

    boolean updateInvoice(int column_name,int SL_no,String Value);
    boolean updateInvoiceNew(int sl_no, String column1, String column2, String column3, String value1, int value2, String value3);
    boolean deleteInvoice(String id);
    List<DistributionChannelTotal> getTotalOrderAmountByDistributionChannel();
    
}
