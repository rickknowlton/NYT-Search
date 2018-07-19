
$(document).ready(function () {
    var userSearch;
    var startDate;
    var endDate;
    var userRecords;
    var $articleList = $("#article-payload");

    var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";

    function runSearch() {
        // console.log("GOT HERE!");
        userSearch = $("#search-term").val();
        // console.log(userSearch);
        startDate = $("#start-year").val();
        // console.log(startDate);
        endDate = $("#end-year").val();
        // console.log(endDate);
        userRecords = $("#records").val();
        // console.log(userRecords);

        url += '?' + $.param({
            'api-key': "fe19669912c945759fb837d25041d6e4",
            'q': userSearch,
            'begin_date': startDate + "0101",
            'end_date': endDate + "0101",
            'sort': "newest",
            'fl': "web_url,headline"
        });
        console.log(url)
        $.ajax({
            url: url,
            method: 'GET',
        }).done(function (result) {
            console.log(result);
            for (var i = 0; i < userRecords; i++) {
                var $headline = result.response.docs[i].headline.main;
                var $url = result.response.docs[i].web_url;
                var $article = $('<a class="d-block" href="'+ $url + '">'+ $headline + '</a>');
                // $article.attr("src", $url);
                // $article.text($headline);
                $articleList.append($article);
            }
        });
    }

    function resetSearch() {
        $articleList.empty();
        url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
        userSearch = null;
        endDate=null;
        startDate=null;
        userRecords=null;
       document.getElementById("searchForm").reset();

    }

    $("#submit").on("click", runSearch);


    $("#clear").on("click", resetSearch);


});