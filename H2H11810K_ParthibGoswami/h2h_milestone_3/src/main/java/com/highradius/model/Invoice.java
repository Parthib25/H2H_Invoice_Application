package com.highradius.model;

public class Invoice {
	int id;
	String cust_order_id;
	 int sales_org;
	 String distribution_channel;
	 int company_code;
	 String order_creation_date;
	 String order_currency;
	 String customer_no;
	 float order_amount;
	 public float getOrder_amount() {
		return order_amount;
	}

	public void setOrder_amount(float order_amount) {
		this.order_amount = order_amount;
	}

	float amount_in_usd;
	 String requested_delivery_date;
	 String division;
	 String released_credit_value;
	 String purchase_order_type;
	 String order_creation_time;
	 public Invoice(int sl_no,String cust_order_id, int sales_org, String distribution_channel, int company_code,
	         String order_creation_date, String order_currency, String customer_no,float order_amount, float amount_in_usd,String requested_delivery_date,
	 String division,
	 String released_credit_value,
	 String purchase_order_type,
	 String order_creation_time) {
	this.id = sl_no;
	this.cust_order_id = cust_order_id;
	this.sales_org = sales_org;
	this.distribution_channel = distribution_channel;
	this.company_code = company_code;
	this.order_creation_date = order_creation_date;
	this.order_currency = order_currency;
	this.order_amount=order_amount;
	this.customer_no = customer_no;
	this.amount_in_usd = amount_in_usd;
	this.requested_delivery_date=requested_delivery_date;
	this.division=division;
	this.released_credit_value=released_credit_value;
	this.purchase_order_type=purchase_order_type;
	this.order_creation_time=order_creation_time;
	}
	 
	 public String getOrder_creation_time() {
		return order_creation_time;
	}

	public void setOrder_creation_time(String order_creation_time) {
		this.order_creation_time = order_creation_time;
	}

	public String getRequested_delivery_date() {
		return requested_delivery_date;
	}

	public void setRequested_delivery_date(String requested_delivery_date) {
		this.requested_delivery_date = requested_delivery_date;
	}

	public String getDivision() {
		return division;
	}

	public void setDivision(String division) {
		this.division = division;
	}

	public String getReleased_credit_value() {
		return released_credit_value;
	}

	public void setReleased_credit_value(String released_credit_value) {
		this.released_credit_value = released_credit_value;
	}

	public String getPurchase_order_type() {
		return purchase_order_type;
	}

	public void setPurchase_order_type(String purchase_order_type) {
		this.purchase_order_type = purchase_order_type;
	}

	public void setSl_no(int sl_no) {
		this.id = sl_no;
	}

	public int getSl_no() {
			return id;
		}


	public String getCust_order_id() {
		return cust_order_id;
	}

	public void setCust_order_id(String cust_order_id) {
		this.cust_order_id = cust_order_id;
	}

	public int getSales_org() {
		return sales_org;
	}

	public void setSales_org(int sales_org) {
		this.sales_org = sales_org;
	}

	public String getDistribution_channel() {
		return distribution_channel;
	}

	public void setDistribution_channel(String distribution_channel) {
		this.distribution_channel = distribution_channel;
	}

	public int getCompany_code() {
		return company_code;
	}

	public void setCompany_code(int company_code) {
		this.company_code = company_code;
	}

	public String getOrder_creation_date() {
		return order_creation_date;
	}

	public void setOrder_creation_date(String order_creation_date) {
		this.order_creation_date = order_creation_date;
	}

	public String getOrder_currency() {
		return order_currency;
	}

	public void setOrder_currency(String order_currency) {
		this.order_currency = order_currency;
	}

	public String getCustomer_no() {
		return customer_no;
	}

	public void setCustomer_no(String customer_no) {
		this.customer_no = customer_no;
	}

	public float getAmount_in_usd() {
		return amount_in_usd;
	}

	public void setAmount_in_usd(float amount_in_usd) {
		
		this.amount_in_usd = amount_in_usd;
	}
}
