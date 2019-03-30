$(document).ready(function () {

    function theTxt(name) {
        var result;
        var fileURL = name;

        $.ajax({
            url: fileURL,
            type: 'get',
            dataType: 'html',
            async: false,
            success: function (data) {
                result = data;
            }
        });
        return result;
    }

    var allText = theTxt("xeber.txt");

    var clearText = allText.replace(/[.,\/#!$%\^&\*;:{}=’'“”?\-_`~()]/g, " ");
    var allSentences = allText.match(/\b(.)+(.)\b/g);
    var allWords = clearText.split(/\s+/);
    var firstWords = [];
    var totalFrequency = {};
    var capitalFrequency = [];
    var theTitleWord = [];
    var titleClear = allSentences[0].replace(/[.,\/#!$%\^&\*;:{}=’'“”?\-_`~()]/g, " ");
    var titleWords = titleClear.split(/\s+/);
    var tags = {};
    var x;



    // Extract Title Words
    for (x = 0; x < titleWords.length; x++) {

        //Only words longer than 2 letter and starting with capital case
        if (titleWords[x].length > 2 && /^[A-Z]/.test(titleWords[x])) {

            //Push matching words to "theTitleWord" array
            theTitleWord.push(titleWords[x].toString().toLowerCase());

        }

    }



    // Get frequency of all words in the text
    for (x = 0; x < allWords.length; x++) {

        var b = allWords[x];

        if (!/\d+/.test(b)) {

            if (totalFrequency[b] === undefined) {

                totalFrequency[b] = 1;

            } else {

                totalFrequency[b] = totalFrequency[b] + 1
            }
        }
    }



    // Get frequency of capital case words in the text
    for (x = 0; x < allWords.length; x++) {

        var c = allWords[x];

        if (c.length > 2 && /^[A-Z]/.test(c)) {

            capitalFrequency.push(c.toString().toLowerCase());

        }
    }



    // Get all opening words of sentences
    for (x = 0; x < allSentences.length; x++) {

        var firstWord = allSentences[x].match(/^\w+/g).toString().toLowerCase();

        if (firstWord.length > 2) {

            firstWords.push(firstWord);
        }
    }



    // Score title words and push to "tags" array 
    for (x = 0; x < theTitleWord.length; x++) {

        var a = theTitleWord[x];

        if (tags[a] === undefined) {

            tags[a] = 9;

        } else {

            tags[a] = tags[a] + 9
        }
    }



    // Score opening words and push to "tags" array 
    for (x = 0; x < firstWords.length; x++) {

        var d = firstWords[x];

        if (tags[d] === undefined) {

            tags[d] = 6;

        } else {

            tags[d] = tags[d] + 6;
        }
    }



    // Score capital case words and push to "tags" array 
    for (x = 0; x < capitalFrequency.length; x++) {

        var g = capitalFrequency[x];

        if (tags[g] === undefined) {

            tags[g] = 3;

        } else {

            tags[g] = tags[g] + 3;
        }
    }


    //Array conversions
    var tagKeys = Object.keys(tags);
    var tagValues = Object.values(tags);

    //Sort tag values
    tagValues.sort(function (a, b) {
        return b - a;
    });

    //Sort tag keys
    tagKeys.sort(function (a, b) {

        var countA = tags[a];
        var countB = tags[b];
        return countB - countA;
    });


    for (x = 0; x < 15; x++) {

        $("#nums").append(tagValues[x] + "</br>");
        $("#tags").append(tagKeys[x] + "</br>");
    }




    var halt = JSON.stringify(tags);

    halt = halt.replace(/,/g, "</br>");
    halt = halt.replace(/"/g, " ");


    $("#total").append(halt);


});
