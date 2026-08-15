<?php

defined( 'ABSPATH' ) || exit;

/**
 * Return an inline SVG icon by name.
 *
 * @param string $icon_name    Icon key.
 * @param string $classes      Extra classes on the <svg> element.
 * @param string $path_classes Extra classes on <path> elements.
 * @return string|null
 */
function svg_icon( $icon_name, $classes = '', $path_classes = '' ) {
	$svg_icons = array(
		'chevron-right' => '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.5 5L11.9107 9.41074C12.1885 9.68852 12.3274 9.82741 12.3274 10C12.3274 10.1726 12.1885 10.3115 11.9107 10.5893L7.5 15" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
		'chevron-left'  => '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.5 5L8.08926 9.41074C7.81148 9.68852 7.67259 9.82741 7.67259 10C7.67259 10.1726 7.81148 10.3115 8.08926 10.5893L12.5 15" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
		'chevron-down'  => '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 9L11.2929 14.2929C11.6262 14.6262 11.7929 14.7929 12 14.7929C12.2071 14.7929 12.3738 14.6262 12.7071 14.2929L18 9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
		'close'         => '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.6671 3.33327L3.33372 12.6666M3.33372 3.33327L12.6671 12.6666" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
		'check'         => '<svg width="13" height="9" viewBox="0 0 13 9" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.4667 0.800049L4.13332 8.13338L0.799988 4.80005" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
		'search'        => '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.6666 11.6665L14.6666 14.6665" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/><path d="M13.3333 7.33317C13.3333 4.01946 10.647 1.33317 7.33325 1.33317C4.01954 1.33317 1.33325 4.01946 1.33325 7.33317C1.33325 10.6469 4.01954 13.3332 7.33325 13.3332C10.647 13.3332 13.3333 10.6469 13.3333 7.33317Z" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"/></svg>',
	);

	if ( ! array_key_exists( $icon_name, $svg_icons ) ) {
		return null;
	}

	$icon = str_replace( '<svg', '<svg class="shrink-0 ' . esc_attr( $classes ) . '" ', $svg_icons[ $icon_name ] );

	return str_replace( '<path', '<path class="' . esc_attr( $path_classes ) . '" ', $icon );
}
