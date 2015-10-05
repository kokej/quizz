//def ajax object
var xmlhttp = new XMLHttpRequest();
var json;

//check ajax status and launch app as we get response
xmlhttp.onreadystatechange = function(){
    if(xmlhttp.readyState === 4 && xmlhttp.status === 200){
        //parse json file and setting json var to it
        json = JSON.parse(xmlhttp.responseText);

        // main app
        // main vars for main app
        var score = 0;
        var nClicks = 0;
        var userAnswer;
        var userAnswerArray=[];

        var getElement = function (item) {
            return document.getElementById(item);
        }

        var conSole = function(){
            console.log('nclicks : ' + nClicks);
        }

        var inputSetter = function(){
            if(userAnswerArray[nClicks]-1){

                //problem when final value = 1
                answers[userAnswerArray[nClicks]-1].checked = true;
            }
            console.log('valor a cambiar: ' + answers[userAnswerArray[nClicks]-1]);
        }

        //cache DOM elements
        var next = getElement('next');
        var back = getElement('back');
        var scoreB = getElement('score');
        var quizz = getElement('quizz');
        var quesH1 = getElement('quesH1');
        var pregunta = getElement('pregunta');
        var ul = getElement('respuesta');
        var answers = document.getElementsByName('answer');
        var cuenca = document.getElementsByName('cuenca');


        // function to populate quizz
        var fill = function () {

            //empty main fields
            pregunta.innerHTML = "";
            ul.innerHTML = "";

            //populate fields

            quesH1.innerHTML = "Question " + (nClicks + 1);

            var question = document.createTextNode(json.allQuestions[nClicks].question);
            pregunta.appendChild(question);

            for (var i = 0; i < json.allQuestions[nClicks].answers.length; i++) {
                var liUl = document.createElement("li");
                liUl.className = "text-left";
                var inLi = document.createElement("input");
                inLi.type = "radio";
                inLi.name = "answer";
                inLi.value = i + 1;
                var node = document.createTextNode(json.allQuestions[nClicks].answers[i]);
                liUl.appendChild(inLi);
                liUl.appendChild(node);
                ul.appendChild(liUl);
            }

        };

        //function

        var showScore = function(){

            scoreB.innerHTML = "Your score: " + score + " / " + json.allQuestions.length;

        };

        // function to check answers
        var checkAnswer = function () {

            var userAnswer = 0;

            for (var i = 0; i < answers.length; i++) {
                
                if (answers[i].checked) {
                    //get checked radio value
                    userAnswer = answers[i].value;
                    
                    if(userAnswerArray[nClicks]){
                        userAnswerArray.splice(nClicks, 1);
                    }
                    //push value to userArray
                    userAnswerArray.splice(nClicks, 0, userAnswer);
                    
                }
            }
            console.log(userAnswer);
            console.log(userAnswerArray);

            //check if no answer selected
            if (userAnswer === 0) {
                alert('You have to choose one answer, dude!');
                nClicks--;
            } else {

                //increase score if all correct
                if (userAnswer == json.allQuestions[nClicks].correct) {
                    score++;
                }

            }

        }

        //initial call to populate function for start
        fill();


        //create next button handle
        next.onclick = function () {

            //as we press the button, we first check previous question answer
            checkAnswer();

            //increase nClicks
            nClicks++;
            conSole();

            //display score to user after each answer
            showScore();

            //empty divs when questions are over
            if (nClicks === json.allQuestions.length) {

                quizz.innerHTML = "<h2 class='text-center'>Your score: " + score + " / " + json.allQuestions.length + "</h2>";

                //if not over, fill divs again
            } else {
                fill();
                inputSetter();
            }
        };

        back.onclick = function(){

            if(nClicks > 0){

                nClicks--;
                fill();
                inputSetter();
                
                if(userAnswerArray[nClicks] == json.allQuestions[nClicks].correct){

                    if(score>0){
                        score--;
                    }
                    showScore();
                }

            } 
            
            conSole();
        };



        //end main app
    }

};



//end ajax function
xmlhttp.open('GET', 'js/question.json', true);
xmlhttp.send();


