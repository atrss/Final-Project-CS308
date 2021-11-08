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
