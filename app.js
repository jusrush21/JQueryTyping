$(document).ready(function () {

    console.log('Page Loaded!')

    let sentences = ['ten ate neite ate nee enet ite ate inet ent eate', 'Too ato too nOt enot one totA not anot tOO aNot', 'oat itain oat tain nate eate tea anne inant nean', 'itant eate anot eat nato inate eat anot tain eat', 'nee ene ate ite tent tiet ent ine ene ete ene ate'];
    
    let sentenceIndex = 0;

    let letterIndex = 0;

    let currentLetterDiv = $("next-letter");

    currentLetterDiv.text(currentLetter);
    $("#words").append(sentences[sentenceIndex]);

    var currentSentence = sentences[0];
    var currentLetter = currentSentence[0];
    var start;
    var finish;
    var errors = 0;

    $("#sentence").append(currentSentence); 
    $("#next-letter").append(currentLetter); 
    $("#keyboard-upper-container").hide(); 

    $(document).keydown(function (event) { 
        var keyDown = event.which;
        if (keyDown === 16) {
            $("#keyboard-upper-container").show();
            $("#keyboard-lower-container").hide();
        }
    })

    
     $(document).keyup(function (event) {
        var keyUp = event.which;
        if (keyUp === 16) {
            $("#keyboard-upper-container").hide();
            $("#keyboard-lower-container").show();
        }
        $('.highlight').removeClass('highlight');
    });

    
     $(document).keypress(function (event) {
        var keyPress = event.which;
        $('#' + keyPress).addClass('highlight');
        var currentSentence = sentences[sentenceIndex];
        var currentLetter = currentSentence[letterIndex];

        if (start == undefined) { 
            start = event.timeStamp;
        }

        $("#yellow-block").css("left", "+=17.5px"); 

        letterIndex++; 
        var nextLetter = currentSentence[letterIndex]; 
        currentLetterDiv.text(nextLetter); 

        if (letterIndex < currentSentence.length -1) { 
            if (event.which === currentLetter.charCodeAt()) { 
                $("#feedback").append("<span class = 'glyphicon glyphicon-ok'></span>"); 
            } else {
                $("#feedback").append("<span class = 'glyphicon glyphicon-remove'></span>");
                errors++; 
            }
        }

        if (letterIndex == currentSentence.length) { 
            $("#sentence").empty(); 
            sentenceIndex++; 
            currentSentence = sentences[sentenceIndex]; 
            
            $("#sentence").append(sentences[sentenceIndex]); 
            letterIndex = 0; 
            if (sentenceIndex < sentences.length - 1) { 
                var nextLetter = currentSentence[letterIndex];
            }
            currentLetterDiv.text(nextLetter); 
            $("#yellow-block").css({ left: 17 }); 
            $("#feedback").empty(); 
        }

        if (sentenceIndex > sentences.length - 1) { 
            finish = event.timeStamp; 
            var time = (finish - start); 
            time /= 60000; 
            var speed = Math.round((54 / time) - (errors * 2)); 
            $("#next-letter").text("Your score is " + speed + " words per minute"); 

            setTimeout(function () {
                var tryAgain = confirm("Do you wnat to try again?");
                if (tryAgain == true) {
                    window.location.reload(); 
                } else {
                    return;
                };
            }, 4000);
        };
    })
});


