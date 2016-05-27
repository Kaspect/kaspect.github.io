<?
if ($_SERVER['REQUEST_METHOD'] === 'POST') {

	header('Content-Type: text/html; charset=utf-8');

	if ($_POST["post_type"] == 'project-front') {
		?>
		<div data-section="," class="project-front project-front-width2 section2 section3">
			<a href="project.html" class="project-front-link">
				<img src="http://placehold.it/600x305" alt="">
				<div class="project-front-cont">
					<p class="project-front-sect">Travels</p>
					<h3>Curabitur sed sapien</h3>
				</div>
			</a>
		</div>
		<div data-section="" class="project-front project-front-width2 section4">
			<a href="project.html" class="project-front-link">
				<img src="http://placehold.it/600x305" alt="">
				<div class="project-front-cont">
					<p class="project-front-sect">Peoples</p>
					<h3>Pellentesque nec odio ut</h3>
				</div>
			</a>
		</div>
		<div data-section="" class="project-front section1">
			<a href="project.html" class="project-front-link">
				<img src="http://placehold.it/300x305" alt="">
				<div class="project-front-cont">
					<p class="project-front-sect">Stories</p>
					<h3>Quisque scelerisque sem sit</h3>
				</div>
			</a>
		</div>
		<div data-section="," class="project-front project-front-width2 section1 section3">
			<a href="project.html" class="project-front-link">
				<img src="http://placehold.it/600x305" alt="">
				<div class="project-front-cont">
					<p class="project-front-sect">Cooking</p>
					<h3>Nam at leo lorem</h3>
				</div>
			</a>
		</div>
		<div data-section="," class="project-front section2 section5">
			<a href="project.html" class="project-front-link">
				<img src="http://placehold.it/300x305" alt="">
				<div class="project-front-cont">
					<p class="project-front-sect">Travels</p>
					<h3>Morbi nec urna ut</h3>
				</div>
			</a>
		</div>
		<?
	} elseif ($_POST["post_type"] == 'blog') {
		?>
		<div class="blog-i">
			<div class="blog-img">
				<a style="background: url(http://placehold.it/600x315);" href="post.html"></a>
			</div>
			<div class="blog-cont">
				<time datetime="2016-05-01 15:15">
					<span>14</span>
					Jun
				</time>
				<p class="blog-category">
					<a href="#">Cooking</a>
				</p>
				<h3><a href="post.html">Maecenas cursus ante diam, sed posuere</a></h3>
				<p>Vestibulum sed vulputate nisi. Suspendisse volutpat vestibulum orci nec luctus. Etiam luctus erat vel pharetra dapibus. Duis vel malesuada ligula, vitae sollicitudin sapien. Fusce molestie vel urna non rhoncus. Donec pulvinar sed justo sed dapibus.</p>
				<p class="blog-info">
					<a href="#" class="blog-more">Read more</a>
					3 comments
				</p>
			</div>
		</div>
		<div class="blog-i">
			<div class="blog-slider">
				<ul class="slides">
					<li>
						<a href="post-slider.html" style="background: url(http://placehold.it/600x315);"></a>
					</li>
					<li>
						<a href="post-slider.html" style="background: url(http://placehold.it/600x315);"></a>
					</li>
					<li>
						<a href="post-slider.html" style="background: url(http://placehold.it/600x315);"></a>
					</li>
					<li>
						<a href="post-slider.html" style="background: url(http://placehold.it/600x315);"></a>
					</li>
				</ul>
			</div>
			<div class="blog-cont">
				<time datetime="2016-05-01 15:15">
					<span>17</span>
					May
				</time>
				<p class="blog-category">
					<a href="#">Cooking</a>
				</p>
				<h3><a href="post-slider.html">Slider Post</a></h3>
				<p>Praesent tincidunt imperdiet lectus, et fermentum erat faucibus in. Duis convallis, risus vitae aliquam tristique, ipsum nulla mollis sem, sed rhoncus augue est id ligula. Praesent eros ligula, fermentum non bibendum sit amet, viverra ut urna. Etiam at justo sem.</p>
				<p class="blog-info">
					<a href="#" class="blog-more">Read more</a>
					3 comments
				</p>
			</div>
		</div>
		<?
	} else {
		header('Location: /');
		exit();
	}

} else {
	header('Location: /');
	exit();
}
?>