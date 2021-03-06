/* 
Author: Huseyn Aghayev
Version: 1.0
License: GPLv2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html
Dependencies: jQuery [https://jquery.com/]

User Interface built on Twitter Bootstrap [https://getbootstrap.com/]
*/

$(document).ready(function () {

    /* Ajax function is for handling text documents

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
    */

    var cleaner = /[.,\/#!$%\^&\*;:{}=’‘'“”"?\-_`~()]/g;
    var stopWords = [];

    // Get stopword array from external JSON file
    $.getJSON("stopwords.json", function (data) {
        $.each(data, function (key, value) {
            stopWords.push(value);
        });
    });

    // Tag analysis button triggers
    $('#tagan').click(function (e) {
        e.preventDefault();

        var allTitle = $("#fulltitle").val();
        var allText = $("#fulltext").val();



        // Check if any input entered
        if (allText) {

            var titleClear = allTitle.replace(cleaner, " ");
            var clearText = allText.replace(cleaner, " ");

            var allWords = clearText.split(/\s+/);
            var titleWords = titleClear.split(/\s+/);
            var allSentences = allText.split(/[.?!]\s/g);

            var titleScore = 5;
            var upperScore = 3;
            var capitScore = 2;
            var firstScore = 3;

            var x;









            // Extract Title Words
            var theTitleWord = [];

            for (x = 0; x < titleWords.length; x++) {

                //Only words longer than 2 letter and starting with capital case
                if (/^[A-Z_ĞÜŞİÖÇ]/.test(titleWords[x])) {

                    //Push matching words to "theTitleWord" array
                    theTitleWord.push(titleWords[x].toString().toLowerCase());
                }
            }



            // Get all opening words of sentences
            var firstWords = [];

            for (x = 0; x < allSentences.length; x++) {

                var theSentence = allSentences[x].toString();
                theSentence = theSentence.replace(cleaner, "");
                theSentence = theSentence.toLowerCase();

                var firstWord = theSentence.split(/\s+/);

                if (firstWord[0]) {
                    firstWords.push(firstWord[0]);
                }
            }




            // Get all abbreviations
            var upperFrequency = [];

            for (x = 0; x < allWords.length; x++) {

                var l = allWords[x];

                if (/[A-Z_ĞÜŞİÖÇ]+[A-Z_ĞÜŞİÖÇ]/g.test(l)) {

                    upperFrequency.push(l.toString().toLowerCase());

                }
            }


            // Get frequency of capital case words in the text
            var capitalFrequency = [];

            for (x = 0; x < allWords.length; x++) {

                var c = allWords[x];

                if (/^[A-Z_ĞÜŞİÖÇ]/.test(c)) {

                    capitalFrequency.push(c.toString().toLowerCase());

                }
            }


            // Score title words and push to "tags" array
            var tags = {};

            for (x = 0; x < theTitleWord.length; x++) {

                var a = theTitleWord[x];

                if (tags[a] === undefined) {

                    tags[a] = titleScore;

                } else {

                    tags[a] = tags[a] + titleScore;
                }
            }


            // Score title words and push to "tags" array 
            for (x = 0; x < upperFrequency.length; x++) {

                var a = upperFrequency[x];

                if (tags[a] === undefined) {

                    tags[a] = upperScore;

                } else {

                    tags[a] = tags[a] + upperScore;
                }
            }


            // Score opening words and push to "tags" array 
            for (x = 0; x < firstWords.length; x++) {

                var d = firstWords[x];

                if (tags[d] === undefined) {

                    tags[d] = firstScore;

                } else {

                    tags[d] = tags[d] + firstScore;
                }
            }


            // Score capital case words and push to "tags" array 
            for (x = 0; x < capitalFrequency.length; x++) {

                var g = capitalFrequency[x];

                if (tags[g] === undefined) {

                    tags[g] = capitScore;

                } else {

                    tags[g] = tags[g] + capitScore;
                }
            }

            // Remove stopwords from results
            for (x = 0; x < stopWords.length; x++) {

                var n = stopWords[x];

                if (tags[n]) {

                    delete tags[n];

                }
            }

            //Array conversions
            var tagKeys = Object.keys(tags);


            //Sort tag keys
            tagKeys.sort(function (a, b) {

                var countA = tags[a];
                var countB = tags[b];
                return countB - countA;
            });



            $('#wrap').removeClass('scale-in-center');
            $('#wrap').addClass('squeeze');
            $('#loading').delay(390).show(0);

            setTimeout(function showTags() {
                $('#loading').hide();

                if (15 < tagKeys.length) {
                    for (x = 0; x < 15; x++) {
                        $("#tags-comma").append('<div class="tagbox">&nbsp;' + tagKeys[x] + '<span>,</span></div>');
                    }
                } else {

                    for (x = 0; x < tagKeys.length; x++) {
                        $("#tags-comma").append('<div class="tagbox">&nbsp;' + tagKeys[x] + '<span>,</span></div>');
                    }

                }

                $('#new').show();
                $("#tags-comma").show();
                $('#wrap').hide();
                $("#tags-comma").addClass('scale-in-center');

            }, 2000);

            $('#new').click(function () {
                location.reload();
            });


        } else {
            alert("Lütfen analiz etmek için bir metin giriniz!");
        }
    });



    $('#freqan').click(function (e) {
        e.preventDefault();

        var allText = $("#fulltitle").val() + " " + $("#fulltext").val();

        if ($("#fulltext").val()) {

            var clearText = allText.replace(cleaner, " ").toLowerCase();
            var allWords = clearText.split(/\s+/);
            var totalFrequency = {};

            var x;


            // Get frequency of all words in the text
            for (x = 0; x < allWords.length; x++) {

                var b = allWords[x];

                if (!/\d+/.test(b) && b.length > 2) {

                    if (totalFrequency[b] === undefined) {

                        totalFrequency[b] = 1;

                    } else {

                        totalFrequency[b] = totalFrequency[b] + 1
                    }
                }
            }

            console.log(totalFrequency);

            // Remove stopwords from results
            for (x = 0; x < stopWords.length; x++) {

                var m = stopWords[x];

                if (totalFrequency[m]) {

                    delete totalFrequency[m];

                }
            }

            console.log(totalFrequency);

            var freqValues = Object.values(totalFrequency);

            //Sort tag values
            freqValues.sort(function (a, b) {
                return b - a;
            });


            //Array conversions
            var freqKeys = Object.keys(totalFrequency);


            //Sort tag keys
            freqKeys.sort(function (a, b) {

                var countA = totalFrequency[a];
                var countB = totalFrequency[b];
                return countB - countA;
            });

            $('#wrap').removeClass('scale-in-center');
            $('#wrap').addClass('squeeze');
            $('#loading').delay(390).show(0);

            setTimeout(function showTags() {
                $('#loading').hide();

                for (x = 0; x < freqKeys.length; x++) {
                    $("#freqs").append(' <li class="list-group-item d-flex justify-content-between align-items-center">' + freqKeys[x] + '<span class="badge badge-primary badge-pill">' + freqValues[x] + '</span></div>');
                }

                $('#new').show();
                $("#freqs").show();
                $('#wrap').hide();
                $("#freqs").addClass('scale-in-center');

            }, 2000);

            $('#new').click(function () {
                location.reload();
            });

        } else {
            alert("Lütfen analiz etmek için bir metin giriniz!");
        }

    });

});
