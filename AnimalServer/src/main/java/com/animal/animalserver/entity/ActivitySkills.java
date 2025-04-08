package com.animal.animalserver.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import java.io.Serializable;
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
@TableName("activity_skills")
public class ActivitySkills implements Serializable {

    private static final long serialVersionUID = 1L;

    @TableId(value = "id", type = IdType.AUTO)
    private Integer id;

    @TableField("activity_id")
    private Integer activityId;

    @TableField("skill_name")
    private String skillName;
}
