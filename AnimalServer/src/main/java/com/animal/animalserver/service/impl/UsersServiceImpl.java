package com.animal.animalserver.service.impl;

import com.animal.animalserver.entity.Users;
import com.animal.animalserver.mapper.UsersMapper;
import com.animal.animalserver.service.IUsersService;
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
public class UsersServiceImpl extends ServiceImpl<UsersMapper, Users> implements IUsersService {

}
