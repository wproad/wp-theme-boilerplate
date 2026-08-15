<?php
?>
</main>
<footer class="site-footer">
	<div class="container">
		<?php
		wp_nav_menu(
			array(
				'theme_location'  => 'footer',
				'container'       => 'nav',
				'container_class' => 'footer-nav',
				'fallback_cb'     => false,
			)
		);
		?>
		<p>&copy; <?php echo esc_html( date( 'Y' ) ); ?> <?php bloginfo( 'name' ); ?></p>
	</div>
</footer>
<div id="spd-toast-container" class="fixed bottom-5 right-5 ml-5 z-50 space-y-3"></div>
<?php wp_footer(); ?>
</body>
</html>
