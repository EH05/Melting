package com.dayangsung.melting.global.common.service;

import static com.dayangsung.melting.global.common.response.enums.ErrorMessage.*;

import java.time.Duration;
import java.util.Map;
import java.util.UUID;
import java.util.regex.Pattern;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import lombok.val;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;
import software.amazon.awssdk.services.s3.presigner.S3Presigner;
import software.amazon.awssdk.services.s3.presigner.model.PutObjectPresignRequest;

@Service
@RequiredArgsConstructor
public class FileService {

	private final S3Presigner presigner;

	public Map<String, String> getImageSignedUrl(String activeProfile, String imageBucketName, String imageBucketPath, String fileName) {

		val regExp = "^(jpeg|png|gif|bmp)$";
		val keyName = "/" + activeProfile + imageBucketPath + "%s-%s".formatted(UUID.randomUUID().toString(), fileName);
		val splittedFileName = fileName.split("\\.");
		val extension = splittedFileName[splittedFileName.length-1].equalsIgnoreCase("jpg")
			? "jpeg" : splittedFileName[splittedFileName.length-1].toLowerCase();
		if(!Pattern.matches(regExp, extension)) {
			throw new IllegalArgumentException(INCORRECT_IMAGE_EXTENSION.getErrorMessage());
		}

		val contentType = "image/" + extension;
		val objectRequest = PutObjectRequest.builder()
			.bucket(imageBucketName)
			.key(keyName)
			.contentType(contentType)
			.build();
		val presignRequest = PutObjectPresignRequest.builder()
			.signatureDuration(Duration.ofMinutes(10))
			.putObjectRequest(objectRequest)
			.build();
		val presignedRequest = presigner.presignPutObject(presignRequest);
		val signedUrl = presignedRequest.url().toString();
		return Map.of("signedUrl", signedUrl, "filename", keyName);
	}
}
