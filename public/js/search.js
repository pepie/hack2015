$(document).ready(function() {


    $("#search-form-button").click(function() {
        var path = '/searchresults?';
            path += $("#search-form").serialize();
        var personId = $('#search-person-id').val();
    
        if (personId) {
            path += "&personId=" + personId;
        }
        window.location = path;
    });

    $('#search-run').click(function() {

        var pricegt = $('#search-pricegt').val();
        var pricelt = $('#search-pricelt').val();
        var origReleaseDatelt = $('#search-origReleaseDatelt').val();
        var origReleaseDategt = $('#search-origReleaseDategt').val();
        var genres = escape($('#search-genres').val());
        var contentTypes = $('#search-contentTypes').val();
        var definition = $('#search-definition').val();
        var purchaseType = $('#search-purchaseType').val();
        var personId = $('#search-person-id').val();

        var path = '/searchresults?';

        path += '&pricelt=' + pricelt;
        path += '&pricegt=' + pricegt;
        path += '&origReleaseDatelt=' + origReleaseDatelt;
        path += '&origReleaseDategt=' + origReleaseDategt;
        path += '&genres=' + genres;
        if(contentTypes)
            path += '&contentTypes=' + contentTypes;
        if(definition)
            path += '&definition=' + definition;
        if(purchaseType)
            path += '&purchaseType=' + purchaseType;
        
        if(personId) {
            path += '&personId=' + personId;
        }
        ///alert("path = " + path);
        window.location = path;
    });

    $('#search-find-person').click(function() {

        var query = encodeURIComponent($('#search-person').val());
        var path = '/proxy/persons?q=' + query;
        
        $.ajax({
            'type': 'GET',
            'url': path,
            'contentType': 'application/json',
            'dataType': 'json',
            'success': function(data) {

                var peopleselecthtml = "<select id='search-person-id' class='form-control'>";

                if(data.results.length == 0 ) {
                    peopleselecthtml += "<option value=''>(No Results)</option>";
                }
                _.each(data.results, function(one) {
                    peopleselecthtml += "<option value='" + one.id + "'>"+ one.name +"</option>";
                });
                
                peopleselecthtml += "</select>";
                $('#search-personid-container').html(peopleselecthtml);
            },
            'error': function(err) {
                console.log("error");
            }
        });

    });


});
// $(function () {

    
// });