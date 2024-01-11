package com.main.trip.fixied.model.biz;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.main.trip.fixied.model.dto.AreaCodeDto;
import com.main.trip.fixied.model.dto.CHUser;
import com.main.trip.fixied.model.dto.ContentList;
import com.main.trip.fixied.model.dto.Favorite;
import com.main.trip.fixied.model.dto.FavoriteList;
import com.main.trip.fixied.model.mapper.Mapper;

@Service
public class BizImpl implements Biz{

	@Autowired
	private Mapper mapper;
	
	@Autowired
	public BizImpl(Mapper mapper) {
		this.mapper = mapper;
	}
	
	@Override
	public AreaCodeDto codeOut(int areacode) {
		return mapper.codeOut(areacode);
	}

	@Override
	public int signUp(CHUser dto) {
		return mapper.signUp(dto);
	}

	@Override
	public List<Integer> contentSelectAll() {
		return mapper.contentSelectAll();
	}

	@Override
	public int addContentList(ContentList contentlist) {
		return mapper.addContentList(contentlist);
	}
	
	@Override
	public int addFavorite(Favorite favorite) {
		return mapper.addFavorite(favorite);
	}
	
	@Override
	public Integer getFid(String ftitle) {
		return mapper.getFid(ftitle);
	}

	@Override
	public int addFavoriteList(FavoriteList favoriteList) {
		return mapper.addFavoriteList(favoriteList);
	}

	@Override
	public CHUser loadProfile(String userid) {
		return mapper.loadProfile(userid);
	}

	@Override
	public ArrayList<Favorite> loadFavorites(String userid) {	
		return mapper.loadFavorites(userid);
	}

	@Override
	public ArrayList<ContentList> loadFavoriteList(String favorFid) {
		return mapper.loadFavoriteList(favorFid);
	}
	

}
