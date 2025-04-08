package com.animal.animalserver.service.impl;

import com.animal.animalserver.entity.Favorites;
import com.animal.animalserver.mapper.FavoritesMapper;
import com.animal.animalserver.service.IFavoritesService;
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
public class FavoritesServiceImpl extends ServiceImpl<FavoritesMapper, Favorites> implements IFavoritesService {

}
