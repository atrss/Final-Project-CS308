/*
// probability functions
    // choose a image => ("lucky", "unlucky")
    // give +1 and -1

// game

    // variables
        // blocksCompleted
        // timeTakeninBlock
        // points
        // timeTaken

    // functions
        // showNextBlockLoadingScreen
        // checkIfGameEnded
        // checkIfBlockEnded
        // addPoints
        // updatePoints
        // checkKeyPress
        // nextBlock
        // runAfterMove
        // showBlackAfterMove
        // a function to prepare next move

*/
console.log("hello world");
/* 
    // logging
        // functions
            // initialise

    // saving
        // functions
            // saveSummary
            // saveRawData

*/

const setStyle = (hasWon, keyCode) =>{
    const face = document.getElementById("face");
    const arrow = keyCode === 69 ? document.getElementById("arrow1") : keyCode === 73 ? document.getElementById("arrow2") : null

    if(hasWon == true){
        face.src = "./images/smiley.png"
    }
    else{
        face.src = "./images/frowny.jpg"
    }

    if (arrow.style.visibility == "hidden") {
        arrow.style.visibility = "visible";
        setTimeout(() =>{
            arrow.style.visibility = "hidden";
        }, 3000)
    }


    if (face.style.visibility == "hidden") {
        face.style.visibility = "visible";
        setTimeout(() =>{
            face.style.visibility = "hidden";
        }, 3000)
    }
}
document.addEventListener('keydown', (e) => {
    /*
    1. catch event if e or i pressed
    2. calculate winner
    
    */
    if ((e.keyCode == 69) || (e.keyCode ==73)){
        console.log("pressed e/i");
         // probFunction to check if it has won or lost --> tells us if face is smiley or frowny 
        // if smiley, then set face.src = ./images/smiley.png
        // else set face.src = ./images/frowny.jpg
        const hasWon = true;
        const keyCode = e.keyCode;
        setStyle(hasWon, keyCode)

    }


});


raw_data = () => {
    return {
        build: "",
        computer: { platform: "" },
        date: "",
        time: "",
        subject: "",
        group: "",
        script: {
            sessionid: "",
        },
        blockcode: "",
        blocknum: "",
        trialcode: "",
        trialnum: "",
        values: {
            countBlocks: "",
            counttrials: "",
            index_correctChoice: "",
            index_incorrectChoice: "",
            correctChoicePosition: "",
            maxCorrectChoices: "",
            reversal: "",
            relearned: "",
            respCategory: "",
            countConsecutiveCorrect: "",
            feedback: "",
            countICFeedback: "",
            countReversals: "",
            totalPoints: "",
            iti: "",
        },
        presentedCorrectStim: "",
        presentedIncorrectStim: "",
        response: "",
        correct: "",
        latency: "",
    };
};

summary_data = () => {
    return {
        computer: { platform: "" },
        script: {
            startdate: "",
            starttime: "",
            subjectid: "",
            groupid: "",
            sessionid: "",
            elapsedtime: "",
            completed: "",
        },
        values: {
            passedPractice: "",
            abort: "",
            totalPoints: "",
            counttrials: "",
            countC: "",
            countLG: "",
            countE: "",
            countRE: "",
            countNR: "",
            countBlocks: "",
            countReversals_test1: "",
            countReversals_test2: "",
            countReversals_test3: "",
        },
        expressions: {
            probC: "",
            probLG: "",
            probE: "",
            probRE: "",
            probNR: "",
            MinICFeedback: "",
            MaxICFeedback: "",
            Mean_ICFeedback: "",
        },
    };
};
