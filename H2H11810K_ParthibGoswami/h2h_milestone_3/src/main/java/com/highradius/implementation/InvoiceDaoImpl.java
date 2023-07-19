package com.highradius.implementation;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;
import java.util.ArrayList;
import com.highradius.connection.*;
import com.highradius.model.DistributionChannelTotal;
import com.highradius.model.Invoice;
public class InvoiceDaoImpl implements InvoiceDao {
   Connection connection;
   public InvoiceDaoImpl(){
	   DatabaseConnection dbobj=new DatabaseConnection();
	   connection=dbobj.getConnection();
   }
   @Override
   public List<Invoice> getInvoices(String id){
	   List<Invoice> invoices = new ArrayList<>();

       String sql = "SELECT * FROM h2h_oap WHERE CUSTOMER_NUMBER=?";
       try (PreparedStatement statement = connection.prepareStatement(sql)) {
           statement.setString(1, id);
           ResultSet resultset = statement.executeQuery();

           while (resultset.next()) {
        	   int slno=resultset.getInt("Sl_no");
        	   String cust_order_id=resultset.getString("CUSTOMER_ORDER_ID");
        	   int sales_org=resultset.getInt("SALES_ORG");
				String dis=resultset.getString("DISTRIBUTION_CHANNEL");
				int comp=resultset.getInt("COMPANY_CODE");
				String order=resultset.getString("ORDER_CREATION_DATE");
				String delivery=resultset.getString("REQUESTED_DELIVERY_DATE");
				String order_curr=resultset.getString("ORDER_CURRENCY");
				String cust_no=resultset.getString("CUSTOMER_NUMBER");
				float order_amount=resultset.getFloat("ORDER_AMOUNT");
				float amount=resultset.getFloat("amount_in_usd");
			
				String order_date= order;
				String  requested_delivery_date= delivery;
				String division=resultset.getString("DIVISION");
				String released_credit_value=resultset.getString("RELEASED_CREDIT_VALUE");
				String purchase_order_type=resultset.getString("PURCHASE_ORDER_TYPE");
				String time=resultset.getString("ORDER_CREATION_TIME");
				
				Invoice inv=new Invoice(slno,cust_order_id,sales_org,dis,comp,order_date,order_curr,cust_no,order_amount,amount,requested_delivery_date,division,released_credit_value,purchase_order_type,time);
				invoices.add(inv);
           }
       } catch (SQLException e) {
           e.printStackTrace();
       } 

       return invoices;
   }
   
   public List<Invoice> getAllInvoices() {
	    List<Invoice> invoices = new ArrayList<>();

	    String sql = "SELECT * FROM h2h_oap LIMIT 100000";
	    try (PreparedStatement statement = connection.prepareStatement(sql)) {
	      
	        ResultSet resultset = statement.executeQuery();

	        while (resultset.next()) {
	        	 int id=resultset.getInt("Sl_no");
	        	String cust_order_id=resultset.getString("CUSTOMER_ORDER_ID");
	        	   int sales_org=resultset.getInt("SALES_ORG");
					String dis=resultset.getString("DISTRIBUTION_CHANNEL");
					int comp=resultset.getInt("COMPANY_CODE");
					String order=resultset.getString("ORDER_CREATION_DATE");
					String delivery=resultset.getString("REQUESTED_DELIVERY_DATE");
					String order_curr=resultset.getString("ORDER_CURRENCY");
					String cust_no=resultset.getString("CUSTOMER_NUMBER");
					float order_amount=Float.parseFloat(resultset.getString("ORDER_AMOUNT"));
					float amount=resultset.getFloat("amount_in_usd");
					
					String  order_date=order;
					String  requested_delivery_date= delivery;
					String division=resultset.getString("DIVISION");
					String released_credit_value=resultset.getString("RELEASED_CREDIT_VALUE");
					String purchase_order_type=resultset.getString("PURCHASE_ORDER_TYPE");
					String time=resultset.getString("ORDER_CREATION_TIME");
					Invoice inv=new Invoice(id,cust_order_id,sales_org,dis,comp,order_date,order_curr,cust_no,order_amount,amount,requested_delivery_date,division,released_credit_value,purchase_order_type,time);
	            invoices.add(inv);
	        }
	    } catch (SQLException e) {
	        e.printStackTrace();
	    }
	    return invoices;
	}

   @Override
  public List<DistributionChannelTotal> getTotalOrderAmountByDistributionChannel(){
	   List<DistributionChannelTotal> chn = new ArrayList<>();
	   String query = "SELECT DISTRIBUTION_CHANNEL, SUM(ORDER_AMOUNT) AS TOTAL_AMOUNT FROM h2h_oap GROUP BY DISTRIBUTION_CHANNEL";
	   try (PreparedStatement statement = connection.prepareStatement(query)) {
		      ResultSet resultset = statement.executeQuery();
		      while (resultset.next()) {
		            String dist = resultset.getString("DISTRIBUTION_CHANNEL");
		            float total = resultset.getFloat("TOTAL_AMOUNT");
		            DistributionChannelTotal ds=new  DistributionChannelTotal(dist,total);
		            chn.add(ds);
		        }
		    } catch (SQLException e) {
		        e.printStackTrace();
		    }

		    return chn;
		}

   
   
   
   
   @Override
   public boolean insertInvoice(String cust_order_id, int sales_org, String dis, int comp, String order, String order_curr,
                                String cust_no, float order_amount) {
       int sl_no = getLastSlNo();

       String sql = "INSERT INTO h2h_oap (Sl_no, CUSTOMER_ORDER_ID, SALES_ORG, DISTRIBUTION_CHANNEL, DIVISION, RELEASED_CREDIT_VALUE, PURCHASE_ORDER_TYPE, COMPANY_CODE, ORDER_CREATION_DATE, ORDER_CREATION_TIME, CREDIT_CONTROL_AREA, SOLD_TO_PARTY, ORDER_AMOUNT, REQUESTED_DELIVERY_DATE, ORDER_CURRENCY, CREDIT_STATUS, CUSTOMER_NUMBER, AMOUNT_IN_USD, UNIQUE_CUST_ID) " +
               "VALUES (?,?,?,?,NULL,NULL,NULL,?,?,NULL,NULL,NULL,?,NULL,?,NULL,?,NULL,NULL)";

       try (PreparedStatement statement = connection.prepareStatement(sql)) {
           statement.setInt(1, sl_no);
           statement.setString(2, cust_order_id);
           statement.setInt(3, sales_org);
           statement.setString(4, dis);
           statement.setInt(5, comp);
           statement.setString(6, order);
           statement.setString(8, order_curr);
           statement.setString(9, cust_no);
           statement.setFloat(7, order_amount);

           int rowsAffected = statement.executeUpdate();
           return rowsAffected > 0;
       } catch (SQLException e) {
           e.printStackTrace();
           return false;
       }
   }

  @Override
   public boolean updateInvoice(int column, int SL_no, String value) {
	    String columnName = ""; // Placeholder for the column name
	    switch (column) {
	        case 1:
	            columnName = "CUSTOMER_ORDER_ID";
	            break;
	        case 2:
	            columnName = "SALES_ORG";
	            break;
	        case 3:
	            columnName = "DISTRIBUTION_CHANNEL";
	            break;
	        case 4:
	            columnName = "DIVISION";
	            break;
	        case 5:
	            columnName = "RELEASED_CREDIT_VALUE";
	            break;
	        case 6:
	            columnName = "PURCHASE_ORDER_TYPE";
	            break;
	        case 7:
	            columnName = "COMPANY_CODE";
	            break;
	        case 8:
	            columnName = "ORDER_CREATION_DATE";
	            break;
	        case 9:
	            columnName = "ORDER_CREATION_TIME";
	            break;
	        case 10:
	            columnName = "CREDIT_CONTROL_AREA";
	            break;
	        case 11:
	            columnName = "SOLD_TO_PARTY";
	            break;
	        case 12:
	            columnName = "ORDER_AMOUNT";
	            break;
	        case 13:
	            columnName = "REQUESTED_DELIVERY_DATE";
	            break;
	        case 14:
	            columnName = "ORDER_CURRENCY";
	            break;
	        case 15:
	            columnName = " CREDIT_STATUS";
	            break;
	        case 16:
	            columnName = "CUSTOMER_NUMBER";
	            break;
	        case 17:
	            columnName = "AMOUNT_IN_USD";
	            break;
	        case 18:
	            columnName = "UNIQUE_CUST_ID";
	            break;
	        
	        default:
	            throw new IllegalArgumentException("Invalid column number: " + column);
	    }
	    
	    String sql = "UPDATE h2h_oap SET " + columnName + " = ? WHERE SL_no = ?";

	    try (PreparedStatement statement = connection.prepareStatement(sql)) {
	        statement.setString(1, value);
	        statement.setInt(2, SL_no);

	        int rowsAffected = statement.executeUpdate();
	        return rowsAffected > 0;
	    } catch (SQLException e) {
	        e.printStackTrace();
	        return false;
	    }
	}
@Override
public boolean deleteInvoice(String id) {

	String sql = "DELETE FROM h2h_oap WHERE SL_no = ?";

    try (PreparedStatement statement = connection.prepareStatement(sql)) {
        statement.setString(1, id);

        int rowsAffected = statement.executeUpdate();
        return rowsAffected > 0;
    } catch (SQLException e) {
        e.printStackTrace();
        return false;
    }
}

public boolean updateInvoiceNew(int sl_no, String column1, String column2, String column3, String value1, int value2, String value3) {
   
    String sql = "UPDATE h2h_oap SET " + column1 + " = ?, " + column2 + " = ?, " + column3 + " = ? WHERE SL_no = ?";

    try (PreparedStatement statement = connection.prepareStatement(sql)) {
        statement.setString(1, value1);
        statement.setInt(2, value2);
        statement.setString(3, value3);
        statement.setInt(4, sl_no);

        int rowsAffected = statement.executeUpdate();
        return rowsAffected > 0;
    } catch (SQLException e) {
        e.printStackTrace();
        return false;
    }
}



private int getLastSlNo() {
    String sql = "SELECT MAX(Sl_no) FROM h2h_oap";
    int l=0;
    try {PreparedStatement statement = connection.prepareStatement(sql);
         ResultSet resultSet = statement.executeQuery() ;
         l=resultSet.getInt(1);
         
         
    }catch(SQLException e) {   
        e.printStackTrace();
    }
    return l;
}
}
