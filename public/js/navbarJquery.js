$(document).ready(function() {

    $('#search').click(function(event) {
            $('.center-menu-item').addClass('hide-item')
            $('#search-form').addClass('active')
            $('#search-icon').hide()
            $('#close-icon').show()
        })
    $('#close').click(function(event) {
            $('.center-menu-item').removeClass('hide-item')
            $('#search-form').removeClass('active')
            $('#close-icon').hide()
            $('#search-icon').show()
        })
    $('#back-icon').click(function(event) {
            $('.center-menu-item').removeClass('hide-item')
            $('#search-form').removeClass('active')
            $('#close-icon').hide()
            $('#search-icon').show()
            $('#search-input').val('')

        })

   $('.menu-bar').click(function() {
       $('#toggle').show();
       $('.left-menu').hide();
   });




    
});