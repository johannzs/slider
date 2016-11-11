$(document).ready(function() {
	var movieDB = 'https://api.themoviedb.org/3/movie/upcoming?api_key=e082a5c50ed38ae74299db1d0eb822fe';
	$.getJSON(movieDB, function (json) {
		$.each(json.results, function (i, v) {
			$('#wrapper').find('ul')
				.append($('<li/>')
					.append($('<img/>').attr('src', 'https://image.tmdb.org/t/p/w1000'+v.backdrop_path))
					.append($('<div class="description"/>')
						.append($('<h2/>').text(v.title))
						.append($('<div/>').addClass('popularity-'+Math.round(v.popularity)))
						.append($('<p/>').text(v.overview))));
		});

		Reference = $('#wrapper ul li:first-child');

		NbElement = $('#wrapper ul li').length;

		$('#wrapper ul')
			.wrap('<div class="slider-container"></div>')
			.css('width', (Reference.width() * NbElement) );
		$('.slider-container')
			.width(  Reference.width()  )
			.height( Reference.height() )
			.css('overflow', 'hidden')
			.before('<a class="slider-prev" href="#"><img src="img/previous.svg" alt="Précédent"/></a>')
			.after('<a class="slider-next" href="#"><img src="img/next.svg" alt="Précédent"/></a>');
		
		Cpt = 0;

		$(".slider-next").click(function() {
			if(Cpt < (NbElement-1) ) {
				Cpt++;
				$('#wrapper ul').animate({
					marginLeft : - (Reference.width() * Cpt)
				});
			}
		});

		$('.slider-prev').click(function() {
			if(Cpt > 0) {
				Cpt--;
				$("#wrapper ul").animate({
					marginLeft : - (Reference.width() * Cpt)
				});
			}
		});

		$('.slider-container').append($('<div class="bullet-navigation"/>'));

		$('li').each(function(i){
			$('.bullet-navigation').append($('<a/>').text((i+1)));
		});

		$('.bullet-navigation a').each(function(index) {
			$(this).attr({
				'href': '#',
				'data-bullet':index
				})
		});

		$('.bullet-navigation a:first-child').addClass('active');

		$('body').on('click', '.bullet-navigation a', function(){
			Cpt = $(this).attr('data-bullet');
			$('.bullet-navigation a').removeClass('active');
			$(this).addClass('active');
			$('#wrapper ul').animate({
				marginLeft : - (Reference.width() * Cpt)
			});
		});
	});
});