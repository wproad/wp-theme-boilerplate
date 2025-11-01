<?php get_header(); ?>

<?php if (have_posts()) : while (have_posts()) : the_post(); ?>
	<article id="post-<?php the_ID(); ?>" <?php post_class('entry'); ?>>
		<h1 class="entry-title"><?php the_title(); ?></h1>
		<div class="entry-content">
			<?php the_content(); ?>
		</div>
	</article>
	<?php comments_template(); ?>
<?php endwhile; else : ?>
	<p><?php esc_html_e('Nothing found.', 'minimal-wp-webpack-tailwind'); ?></p>
<?php endif; ?>

<?php get_footer(); ?>


