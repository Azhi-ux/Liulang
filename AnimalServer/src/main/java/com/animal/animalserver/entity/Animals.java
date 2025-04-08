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
@TableName("animals")
public class Animals implements Serializable {

    private static final long serialVersionUID = 1L;

    @TableId(value = "id", type = IdType.AUTO)
    private Integer id;

    @TableField("name")
    private String name;

    @TableField("type")
    private String type;

    @TableField("breed")
    private String breed;

    @TableField("age")
    private String age;

    @TableField("gender")
    private String gender;

    @TableField("size")
    private String size;

    @TableField("description")
    private String description;

    @TableField("health_status")
    private String healthStatus;

    @TableField("vaccination_status")
    private String vaccinationStatus;

    @TableField("adoption_status")
    private String adoptionStatus;

    @TableField("created_at")
    private LocalDateTime createdAt;

    @TableField("updated_at")
    private LocalDateTime updatedAt;
}
