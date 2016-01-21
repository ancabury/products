// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require_tree .

function addJS(){
   $('#myModal').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget); // Button that triggered the modal
    var name = button.data('name'); // Extract info from data-* attributes
    var description = button.data('desc');
    var manufacturer = button.data('manufacturer');
    var price = button.data('price');
    var quantity = button.data('quantity');
    var img = button.data('img');
    // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
    // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
    var modal = $(this);
    modal.find('.modal-title').text(name);
    modal.find('.modal-body > .description > p').text(description);
    modal.find('.modal-body > .manufacturer > p').text(manufacturer);
    modal.find('.modal-body > .price > p').text("Price: " + price);
    modal.find('.modal-body > .quantity > p').text("Quantity: " + quantity);
    modal.find('img').attr('src', img);

    $.ajax({
      type: 'GET',
      url: '/product/' + button.data('id') + '/popularity',
      dataType: 'json',
      success: function(data){
        // console.log("done");
        $('.chart').html(data.content);
      },
       error: function (XMLHttpRequest, textStatus, errorThrown) {
        console.log(XMLHttpRequest.responseText);
        console.log(textStatus);
        console.log(errorThrown);
      }
    })
  });
}

$(document).ready(function() {
  $('.search-engine').keypress(function(){
    var value = $('#q_name_or_description_cont').val();
    $.ajax({
      type: 'GET',
      url: '/search',
      dataType: 'json',
      data: $.param({ q: {name_or_description_cont: value }}),
      success: function(data){
        // console.log("done");
        // console.log(data.content);
        $('.results').html(data.content);
        addJS();
      },
       error: function (XMLHttpRequest, textStatus, errorThrown) {
        console.log(XMLHttpRequest.responseText);
        console.log(textStatus);
        console.log(errorThrown);
      }
    })
  });
});
