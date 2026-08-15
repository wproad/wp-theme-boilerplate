<?php get_header(); ?>

<article class="entry">
	<h1 class="entry-title"><?php esc_html_e( 'Page not found', 'sepid' ); ?></h1>
	<div class="entry-content">
		<p><?php esc_html_e( 'The page you are looking for could not be found.', 'sepid' ); ?></p>
		<?php get_search_form(); ?>
	</div>
</article>

<?php get_footer(); ?>
