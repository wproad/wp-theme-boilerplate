<?php get_header(); ?>

<?php if ( have_posts() ) : ?>
	<?php
	while ( have_posts() ) :
		the_post();
		?>
		<article id="post-<?php the_ID(); ?>" <?php post_class( 'entry' ); ?>>
			<h1 class="entry-title"><?php the_title(); ?></h1>
			<div class="entry-content">
				<?php the_content(); ?>
			</div>
		</article>
	<?php endwhile; ?>
<?php else : ?>
	<p><?php esc_html_e( 'Nothing found.', 'sepid' ); ?></p>
<?php endif; ?>

<?php get_footer(); ?>
