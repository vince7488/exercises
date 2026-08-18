<?php
/**
 * Plugin Name: KBH Headless WPForms Bridge
 * Description: Allows the approved local React frontend to use WPForms' native AJAX submission handler.
 */

defined( 'ABSPATH' ) || exit;

/**
 * Adds a narrowly scoped CORS response for native WPForms AJAX submissions.
 */
function kbh_allow_headless_wpforms_submission() {
	if ( ! wp_doing_ajax() || ( $_REQUEST['action'] ?? '' ) !== 'wpforms_submit' ) { // phpcs:ignore WordPress.Security.NonceVerification.Recommended
		return;
	}

	$origin          = get_http_origin();
	$allowed_origins = apply_filters(
		'kbh_headless_wpforms_allowed_origins',
		[
			'http://localhost:5173',
			'http://127.0.0.1:5173',
		]
	);

	if ( ! $origin || ! in_array( $origin, $allowed_origins, true ) ) {
		return;
	}

	header( 'Access-Control-Allow-Origin: ' . esc_url_raw( $origin ) );
	header( 'Vary: Origin', false );
}
add_action( 'admin_init', 'kbh_allow_headless_wpforms_submission', 0 );
