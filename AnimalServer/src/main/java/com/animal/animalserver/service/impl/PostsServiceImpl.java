package com.animal.animalserver.service.impl;

import com.animal.animalserver.entity.Posts;
import com.animal.animalserver.mapper.PostsMapper;
import com.animal.animalserver.service.IPostsService;
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
public class PostsServiceImpl extends ServiceImpl<PostsMapper, Posts> implements IPostsService {

}
