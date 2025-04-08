package com.animal.animalserver.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import lombok.Getter;
import lombok.Setter;

/**
 * <p>
 * 
 * </p>
 *
 * @author animal
 * @since 2025-04-08
 */
@Getter
@Setter
@TableName("donations")
public class Donations implements Serializable {

    private static final long serialVersionUID = 1L;

    @TableId(value = "id", type = IdType.AUTO)
    private Integer id;

    @TableField("user_id")
    private Integer userId;

    @TableField("project_id")
    private Integer projectId;

    @TableField("amount")
    private BigDecimal amount;

    @TableField("purpose")
    private String purpose;

    @TableField("name")
    private String name;

    @TableField("phone")
    private String phone;

    @TableField("email")
    private String email;

    @TableField("message")
    private String message;

    @TableField("payment_method")
    private String paymentMethod;

    @TableField("payment_id")
    private String paymentId;

    @TableField("status")
    private String status;

    @TableField("donation_date")
    private LocalDateTime donationDate;

    @TableField("created_at")
    private LocalDateTime createdAt;

    @TableField("updated_at")
    private LocalDateTime updatedAt;
}
