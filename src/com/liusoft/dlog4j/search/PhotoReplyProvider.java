﻿/*
 *  PhotoReplyProvider.java
 *  
 *  This program is free software; you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation; either version 2 of the License, or
 *  (at your option) any later version.
 *
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU Library General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with this program; if not, write to the Free Software
 *  Foundation, Inc., 59 Temple Place - Suite 330, Boston, MA 02111-1307, USA.
 *  
 *  Author: Winter Lau (javayou@gmail.com)
 *  http://dlog4j.sourceforge.net
 *  
 */
package com.liusoft.dlog4j.search;

import java.util.Date;
import java.util.List;

import com.liusoft.dlog4j.dao.PhotoDAO;

/**
 * 照片评论搜索之数据读取接口实现
 * @author Winter Lau
 */
public class PhotoReplyProvider implements SearchDataProvider {

	/* (non-Javadoc)
	 * @see com.liusoft.dlog4j.search.SearchDataProvider#fetchAfter(java.util.Date)
	 */
	public List fetchAfter(Date beginTime) throws Exception {
		return PhotoDAO.listPhotoRepliesAfter(beginTime);
	}

}