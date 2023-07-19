package com.highradius.connection;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class DatabaseConnection {
	private  final String DB_URL = "jdbc:mysql://localhost:3306/mysql";
    private  final String DB_USER = "root";
    private  final String DB_PASSWORD = "Parthib@123";

    public  Connection getConnection() {
        Connection connection = null;
        try {
        	Class.forName("com.mysql.cj.jdbc.Driver");
            connection = DriverManager.getConnection(this.DB_URL, this.DB_USER, this.DB_PASSWORD);
            System.out.println("Connection successfull!");
        } catch (SQLException | ClassNotFoundException e) {
            e.printStackTrace();
        }
        return connection;
    }
   

	
}
