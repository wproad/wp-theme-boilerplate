<?php get_header(); ?>

<h1 class="page-title">
	<?php
	printf(
		/* translators: %s: search query */
		esc_html__( 'Search results for: %s', 'sepid' ),
		esc_html( get_search_query() )
	);
	?>
</h1>

<?php if ( have_posts() ) : ?>
	<?php
	while ( have_posts() ) :
		the_post();
		?>
		<article id="post-<?php the_ID(); ?>" <?php post_class( 'entry' ); ?>>
			<h2 class="entry-title"><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h2>
			<div class="entry-content">
				<?php the_excerpt(); ?>
			</div>
		</article>
	<?php endwhile; ?>

	<?php the_posts_pagination(); ?>

<?php else : ?>
	<p><?php esc_html_e( 'No results found.', 'sepid' ); ?></p>
<?php endif; ?>

<?php get_footer(); ?>
