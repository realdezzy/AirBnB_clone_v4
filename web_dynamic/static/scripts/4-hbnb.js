$(document).ready(checker);

const host = "0.0.0.0";

function checker(){
	amenityObj = {}
	$('.amenities .popover input').change(function () {
    		if ($(this).is(':checked')) {
      			amenityObj[$(this).attr('data-name')] = $(this).attr('data-id');
    		} else if ($(this).is(':not(:checked)')) {
      			delete amenityObj[$(this).attr('data-name')];
    		}
    		const names = Object.keys(amenityObj);
    		$('.amenities h4').text(names.sort().join(', '));
  	});

	fetchPlaces();
}

$.get("http://0.0.0.0:5001/api/v1/status/")
	.done(function (data, stats) {
	if (data["status"] == "OK"){
		$('div#api_status').addClass("available");
	}
	else{
		$('div#api_status').removeClass("available");
	}
	})
	.fail(function (){
		$('div#api_status').removeClass("available");
	});

function fetchPlaces () {
  const PLACES_URL = `http://${host}:5001/api/v1/places_search/`;
  $.ajax({
    url: PLACES_URL,
    type: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data: JSON.stringify({}),
    success: function (response) {
      for (const r of response) {
        const article = ['<article>',
          '<div class="title_box">',
        `<h2>${r.name}</h2>`,
        `<div class="price_by_night">$${r.price_by_night}</div>`,
        '</div>',
        '<div class="information">',
        `<div class="max_guest">${r.max_guest} Guest(s)</div>`,
        `<div class="number_rooms">${r.number_rooms} Bedroom(s)</div>`,
        `<div class="number_bathrooms">${r.number_bathrooms} Bathroom(s)</div>`,
        '</div>',
        '<div class="description">',
        `${r.description}`,
        '</div>',
        '</article>'];
        $('SECTION.places').append(article.join(''));
      }
    },
    error: function (error) {
      console.log(error);
    }
  });
}

$("button").on('click', function (){
  const PLACES_URL = `http://${host}:5001/api/v1/places_search/`;
  $.ajax({
    url: PLACES_URL,
    type: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data: JSON.stringify({ amenities: Object.values(amenityObj) }),
    success: function (response) {
      $('SECTION.places').empty();
      for (const r of response) {
        const article = ['<article>',
          '<div class="title_box">',
        `<h2>${r.name}</h2>`,
        `<div class="price_by_night">$${r.price_by_night}</div>`,
        '</div>',
        '<div class="information">',
        `<div class="max_guest">${r.max_guest} Guest(s)</div>`,
        `<div class="number_rooms">${r.number_rooms} Bedroom(s)</div>`,
        `<div class="number_bathrooms">${r.number_bathrooms} Bathroom(s)</div>`,
        '</div>',
        '<div class="description">',
        `${r.description}`,
        '</div>',
        '</article>'];
        $('SECTION.places').append(article.join(''));
      }
    },
    error: function (error) {
      console.log(error);
    }
  });
});