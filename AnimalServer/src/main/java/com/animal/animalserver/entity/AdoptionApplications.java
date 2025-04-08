package com.animal.animalserver.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import java.io.Serializable;
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
@TableName("adoption_applications")
public class AdoptionApplications implements Serializable {

    private static final long serialVersionUID = 1L;

    @TableId(value = "id", type = IdType.AUTO)
    private Integer id;

    @TableField("user_id")
    private Integer userId;

    @TableField("animal_id")
    private Integer animalId;

    @TableField("applicant_name")
    private String applicantName;

    @TableField("applicant_phone")
    private String applicantPhone;

    @TableField("applicant_email")
    private String applicantEmail;

    @TableField("home_environment")
    private String homeEnvironment;

    @TableField("experience")
    private String experience;

    @TableField("status")
    private String status;

    @TableField("reason")
    private String reason;

    @TableField("submit_date")
    private LocalDateTime submitDate;

    @TableField("review_date")
    private LocalDateTime reviewDate;

    @TableField("created_at")
    private LocalDateTime createdAt;

    @TableField("updated_at")
    private LocalDateTime updatedAt;
}
