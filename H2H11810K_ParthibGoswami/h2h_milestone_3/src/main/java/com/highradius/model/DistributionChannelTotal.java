package com.highradius.model;

public class DistributionChannelTotal {
    private String distributionChannel;
    private double totalAmount;

    public DistributionChannelTotal(String distributionChannel, double totalAmount) {
        this.distributionChannel = distributionChannel;
        this.totalAmount = totalAmount;
    }

    public String getDistributionChannel() {
        return distributionChannel;
    }

    public double getTotalAmount() {
        return totalAmount;
    }
}
