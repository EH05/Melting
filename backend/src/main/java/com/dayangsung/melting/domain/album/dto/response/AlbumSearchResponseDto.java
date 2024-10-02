package com.dayangsung.melting.domain.album.dto.response;

import java.time.LocalDateTime;

import com.dayangsung.melting.domain.album.entity.Album;

import lombok.Builder;

@Builder
public record AlbumSearchResponseDto(
	Long albumId,
	String albumName,
	String creatorNickname,
	LocalDateTime createdAt
) {
	public static AlbumSearchResponseDto of(Album album) {
		return AlbumSearchResponseDto.builder()
			.albumId(album.getId())
			.albumName(album.getAlbumName())
			.creatorNickname(album.getMember().getNickname())
			.build();
	}
}
