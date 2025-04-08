package com.animal.animalserver.controller;

import com.animal.animalserver.entity.Animals;
import com.animal.animalserver.service.AnimalsService;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * <p>
 *  前端控制器
 * </p>
 *
 * @author animal
 * @since 2025-04-08
 */
@RestController
@RequestMapping("/api/animals")
public class AnimalsController {

    @Autowired
    private AnimalsService animalsService;

    @PostMapping
    public boolean save(@RequestBody Animals animals) {
        return animalsService.save(animals);
    }

    @PutMapping
    public boolean update(@RequestBody Animals animals) {
        return animalsService.updateById(animals);
    }

    @DeleteMapping("/{id}")
    public boolean delete(@PathVariable Integer id) {
        return animalsService.removeById(id);
    }

    @GetMapping("/{id}")
    public Animals getById(@PathVariable Integer id) {
        return animalsService.getById(id);
    }

    @GetMapping("/list")
    public List<Animals> list() {
        return animalsService.list();
    }

    @GetMapping("/page")
    public Page<Animals> page(@RequestParam(defaultValue = "1") Integer pageNum,
                            @RequestParam(defaultValue = "10") Integer pageSize,
                            @RequestParam(required = false) String name,
                            @RequestParam(required = false) String type,
                            @RequestParam(required = false) String adoptionStatus) {
        Page<Animals> page = new Page<>(pageNum, pageSize);
        QueryWrapper<Animals> queryWrapper = new QueryWrapper<>();
        
        if (name != null && !name.isEmpty()) {
            queryWrapper.like("name", name);
        }
        if (type != null && !type.isEmpty()) {
            queryWrapper.eq("type", type);
        }
        if (adoptionStatus != null && !adoptionStatus.isEmpty()) {
            queryWrapper.eq("adoption_status", adoptionStatus);
        }
        
        return animalsService.page(page, queryWrapper);
    }
}
