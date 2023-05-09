$(document).ready(checker);

const host = "0.0.0.0";
amenObjs = {}
cityObjs = {}
stateObjs = {}

function checker(){
        $('.amenities .popover input').change(function () { obj = amenObjs; updateCheck.call(this, 1); });
        $('.input_state').change(function () { obj = stateObjs; updateCheck.call(this, 2); });
        $('.input_city').change(function () { obj = cityObjs; updateCheck.call(this), 3; });

	fetchPlaces();
}

function updateCheck (Obj) {
  if ($(this).is(':checked')) {
    obj[$(this).attr('data-name')] = $(this).attr('data-id');
  } else if ($(this).is(':not(:checked)')) {
    delete obj[$(this).attr('data-name')];
  }
  const names = Object.keys(obj);
  if (Obj === 1) {
    $('.amenities h4').text(names.sort().join(', '));
  } else if (Obj === 2) {
    $('.locations h4').text(names.sort().join(', '));
  }
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
    data: JSON.stringify({ amenities: Object.values(amenObjs) }),
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


