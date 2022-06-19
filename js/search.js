;(function () {
    function buildHighlightedSpanString(mainText, subtexts) {
        // Sort subtexts by position in text 
        subtexts.sort((a, b) => a.position - b.position);
        var newText = "";
        var currentPos = 0;
        subtexts.forEach(({text,position}) => {
            newText += [mainText.slice(currentPos,position),
                        '<span class="search-match-highlight">',
                        mainText.slice(position, position + text.length),
                        '</span>'].join('');
            currentPos = position + text.length;
        });
        newText += mainText.slice(currentPos);

        return newText;
    }

    function getValidSubtexts(text, words) {
        var validSubtexts = [];
        words.forEach((word) => {
            try {
                var regex = new RegExp('\\b' + word + '\\b');
                var pos = text.toLowerCase().search(regex);
            } catch (error) {
                var pos = -1;
            }

            if (pos < 0)
                pos = text.toLowerCase().indexOf(word);

            if (pos > -1)
                validSubtexts.push({"text": word, "position": pos});
        });

        return validSubtexts;
    }

    function insertHighlightedSpan(text, words) {
        var validSubtexts = getValidSubtexts(text, words)
        
        return buildHighlightedSpanString(text, validSubtexts);
    }

    function generateHighlightedHtml(item, metadata) {
        html = '<li><a class="search-result-title" href="' + item.url + '">';
        // Flag if title and/or content will change
        var titleMatches = [];
        var contentMatches = [];
        for (let word in metadata) {
            var contextLocations = Object.keys(metadata[word]);
            if (contextLocations.includes('title'))
                titleMatches.push(word);
            if (contextLocations.includes('content'))
                contentMatches.push(word);
        }

        var title = item.title;
        if (titleMatches.length > 0) {
            // Generate html highlight code for each word
            title = insertHighlightedSpan(item.title, titleMatches);
        }
        html += '<h3>' + title + '</h3></a>';

        var context = item.content.slice(0,150);
        if (contentMatches.length > 0) {
            // Generate html highlight code for each word
            console.log(contentMatches);
            var firstPosition = getValidSubtexts(item.content, contentMatches)[0].position;
            context = item.content.substring(firstPosition - 75, firstPosition + 75);
            context = insertHighlightedSpan(context, contentMatches.slice(0,1));
        }
        html += '<p>' + context + '</p></li>';

        return html;
    }

    function displaySearchResults(results, store) {
        var searchResults = document.getElementById('search-results');

        if (results.length > 0) {
            var appendString = '';
            for (let i = 0; i < results.length; i++) {
                const item = store.find((doc) => doc.id === results[i].ref);
                appendString += generateHighlightedHtml(item, results[i].matchData.metadata);
            }

            searchResults.innerHTML = appendString;
        } else {
            searchResults.innerHTML = '<li>No se encontraron resultados</li>';
        }
    }

    function getQueryVariable(variable) {
        var query = window.location.search.substring(1);
        var vars = query.split('&');

        for (var i = 0; i < vars.length; i++) {
            var pair = vars[i].split('=');

            if (pair[0] == variable) {
                return decodeURIComponent(pair[1].replace(/\+/g, '%20'));
            }
        }
    }

    var searchTerm = getQueryVariable('query');

    if (searchTerm) {
        document.getElementById('search-box').setAttribute("value", searchTerm);

        //Initialize lunr index
        var index = lunr(function () {
            //Title gets a boost of 10 because it is more important
            this.ref('id');
            this.field('title', {boost: 10});
            this.field('content');

            window.store.forEach(function (doc) {
                this.add(doc);
            }, this);
        });

        //Search
        var results = index.search(searchTerm);
        displaySearchResults(results, window.store);
    }
})();
