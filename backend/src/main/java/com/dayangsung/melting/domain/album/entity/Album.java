package com.dayangsung.melting.domain.album.entity;

import java.util.ArrayList;
import java.util.List;

import com.dayangsung.melting.domain.album.enums.AlbumCategory;
import com.dayangsung.melting.domain.member.entity.Member;
import com.dayangsung.melting.global.entity.BaseEntity;

import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

// TODO: 해시태그 추가
@Entity
@Getter
@Table(name = "album")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Album extends BaseEntity {

	// 생성 앨범 식별자
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "album_id")
	private Long id;

	// 회원 식별자
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "member_id", nullable = false)
	private Member member;

	// 앨범명
	@Column(nullable = false)
	private String albumName;

	// 유형
	@Column(nullable = false)
	private AlbumCategory category;

	// 장르 목록
	@ElementCollection
	@Column(nullable = false)
	private List<String> genres = new ArrayList<>();

	// 앨범 소개
	@Column(columnDefinition = "TEXT")
	private String albumDescription;

	// 앨범 커버 이미지
	@Column(nullable = false)
	private String albumCoverImage;

	// 좋아요 수
	@Column(nullable = false)
	private Long likedCount;

	// 공개 여부
	@Column(nullable = false)
	private Boolean isPublic;

	// 삭제 여부
	@Column(nullable = false)
	private Boolean isDeleted;

	@Builder
	public Album(Member member, String albumName, AlbumCategory category, List<String> genres, String albumDescription,
			String albumCoverImage) {
		this.member = member;
		this.albumName = albumName;
		this.category = category;
		this.genres = genres;
		this.albumDescription = albumDescription;
		this.albumCoverImage = albumCoverImage;
		this.likedCount = 0L;
		this.isPublic = false;
		this.isDeleted = false;
	}

	public void updateAlbumName(String albumName) {
		this.albumName = albumName;
	}

	public void updateAlbumDescription(String albumDescription) {
		this.albumDescription = albumDescription;
	}

	public void togglePublicStatus() {
		this.isPublic = !isPublic;
	}

	public void deleteAlbum() {
		this.isDeleted = true;
	}
}