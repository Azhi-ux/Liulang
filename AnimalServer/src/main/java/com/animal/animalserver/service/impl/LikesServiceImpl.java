package com.animal.animalserver.service.impl;

import com.animal.animalserver.entity.Likes;
import com.animal.animalserver.mapper.LikesMapper;
import com.animal.animalserver.service.ILikesService;
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
public class LikesServiceImpl extends ServiceImpl<LikesMapper, Likes> implements ILikesService {

}
