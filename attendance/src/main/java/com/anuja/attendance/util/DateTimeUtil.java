package com.anuja.attendance.util;

import java.time.Instant;

public final class DateTimeUtil {

	private DateTimeUtil() {
	}

	public static Instant now() {
		return Instant.now();
	}
}