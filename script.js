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

  $('#tagan').click(function (e) {
    e.preventDefault();

    var allText = $("#fulltext").val();
    var allTitle = $("#fulltitle").val();

    var clearText = allText.replace(/[.,\/#!$%\^&\*;:{}=’'“”?\-_`~()]/g, " ");
    var allSentences = allText.match(/(.)+(.)/g);

    var allWords = clearText.split(/\s+/);
    var firstWords = [];
    var totalFrequency = {};
    var capitalFrequency = [];
    var theTitleWord = [];
    var titleClear = allTitle.replace(/[.,\/#!$%\^&\*;:{}=’'“”?\-_`~()]/g, " ");
    var titleWords = titleClear.split(/\s+/);
    var tags = {};
    var upperFrequency = [];
    var x;

    var titleScore = 9;
    var upperScore = 3;
    var capitScore = 3;
    var firstScore = 3;

    // Get all abbreviations
    for (x = 0; x < allWords.length; x++) {

      var l = allWords[x];

      if (/[A-Z_ĞÜŞİÖÇ]+[A-Z_ĞÜŞİÖÇ]/g.test(l)) {

        upperFrequency.push(l.toString().toLowerCase());

      }
    }


    // Get all opening words of sentences
    for (x = 0; x < allSentences.length; x++) {

      var firstWord = allSentences[x].match(/^[A-Za-z_ğüşıöçĞÜŞİÖÇ]+/g).toString();

      if (!/^[a-z_ğüşıöç\d]/.test(firstWord)) {

        firstWords.push(firstWord.toLowerCase());
      }
    }


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


    // Score title words and push to "tags" array 
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


    //Array conversions
    var tagKeys = Object.keys(tags);


    //Sort tag keys
    tagKeys.sort(function (a, b) {

      var countA = tags[a];
      var countB = tags[b];
      return countB - countA;
    });



      $('#new').show();
      $("#tags-comma").show();
//    $('#wrap').removeClass('scale-in-center');
//    $('#wrap').addClass('squeeze');
//    $('#loading').delay(390).show(0);

//    setTimeout(function showTags() {
//      $('#loading').hide();

      for (x = 0; x < 15; x++) {
        $("#tags-comma").append('<div class="tagbox">&nbsp;' + tagKeys[x] + '<span>,</span></div>');
      }

//      $('#wrap').hide();

//      $("#tags-comma").addClass('scale-in-center');
//
//    }, 2000);
//





    $('#new').click(function () {
      location.reload();
    });

  });



  $('#freqan').click(function (e) {
    e.preventDefault();

    var allText = $("#fulltitle").val() + " " + $("#fulltext").val();

    var clearText = allText.replace(/[.,\/#!$%\^&\*;:{}=’'“”?\-_`~()]/g, " ");
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
    console.log(totalFrequency);

    $('form').hide();

    for (x = 0; x < freqKeys.length; x++) {
      $("#freqs").append(' <li class="list-group-item d-flex justify-content-between align-items-center">' + freqKeys[x] + '<span class="badge badge-primary badge-pill">' + freqValues[x] + '</span></div>');
    }

    $('#new').show();

    $('#new').click(function () {
      location.reload();
    });

  });

});
