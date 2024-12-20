package com.dayangsung.melting.domain.song.enums;

import lombok.Getter;

@Getter
public enum SongType {
	MELTING("Melting"),
	AICOVER("AICover");

	private final String songType;

	SongType(String songType) {
		this.songType = songType;
	}
}
