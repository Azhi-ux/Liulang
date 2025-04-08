package com.animal.animalserver.generator;

//import com.baomidou.mybatisplus.annotation.DbType;
import com.baomidou.mybatisplus.generator.FastAutoGenerator;
import com.baomidou.mybatisplus.generator.config.OutputFile;
import java.util.Arrays;
import java.util.Collections;

public class CodeGenerator {

    public static void main(String[] args) {
        FastAutoGenerator.create("jdbc:mysql://mysql2.sqlpub.com:3307/animal_db?useUnicode=true&characterEncoding=UTF-8&serverTimezone=Asia/Shanghai",
                        "animal_db",
                        "b5TWG4zqzlozIzDk")
                .globalConfig(builder -> {
                    builder.author("animal")
                            .outputDir(System.getProperty("user.dir") + "/src/main/java")
                            .commentDate("yyyy-MM-dd")
                            .disableOpenDir();
                })
                .packageConfig(builder -> {
                    builder.parent("com.animal.animalserver")
                            .entity("entity")
                            .service("service")
                            .serviceImpl("service.impl")
                            .mapper("mapper")
                            .xml("mapper.xml")
                            .controller("controller")
                            .pathInfo(Collections.singletonMap(OutputFile.xml,
                                    System.getProperty("user.dir") + "/src/main/resources/mapper"));
                })
                .strategyConfig(builder -> {
                    builder.addInclude(Arrays.asList(
                            "users", "animals", "animal_images", "adoption_applications", "donation_projects",
                            "donations", "volunteer_activities", "activity_skills", "volunteer_applications",
                            "volunteer_available_times", "volunteer_skills", "volunteer_records",
                            "posts", "post_images", "post_tags", "comments", "likes", "favorites", "settings"
                    ));
                    builder.entityBuilder().enableLombok().enableTableFieldAnnotation();
                    builder.mapperBuilder().enableBaseResultMap().enableBaseColumnList();
                    builder.controllerBuilder().enableRestStyle().enableHyphenStyle();
                    builder.serviceBuilder();
                })
                .execute();
    }
}
