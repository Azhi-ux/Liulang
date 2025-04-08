package com.animal.animalserver.service.impl;

import com.animal.animalserver.entity.Comments;
import com.animal.animalserver.mapper.CommentsMapper;
import com.animal.animalserver.service.ICommentsService;
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
public class CommentsServiceImpl extends ServiceImpl<CommentsMapper, Comments> implements ICommentsService {

}
