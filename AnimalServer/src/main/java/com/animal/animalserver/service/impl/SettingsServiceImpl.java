package com.animal.animalserver.service.impl;

import com.animal.animalserver.entity.Settings;
import com.animal.animalserver.mapper.SettingsMapper;
import com.animal.animalserver.service.ISettingsService;
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
public class SettingsServiceImpl extends ServiceImpl<SettingsMapper, Settings> implements ISettingsService {

}
