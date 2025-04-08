package com.animal.animalserver.service.impl;

import com.animal.animalserver.entity.Animals;
import com.animal.animalserver.mapper.AnimalsMapper;
import com.animal.animalserver.service.AnimalsService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

/**
 * <p>
 *  服务实现类
 * </p>
 *
 * @author animal
 * @since 2025-04-08
 */
@Service
public class AnimalsServiceImpl extends ServiceImpl<AnimalsMapper, Animals> implements AnimalsService {

}
