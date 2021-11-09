const MIN = 60,
    POINT_PROB = 0.8,
    TIME_IN_BLOCK = 9 * MIN;

const chooseImage = () => {
    if (Math.random() > 0.5) {
        return "lucky";
    } else return "unlucky";
};

const choosePoint = (imageType) => {
    const point = Math.random() > POINT_PROB ? 1 : -1;
    if (imageType === "unlucky") {
        point *= -1;
    }
    return point;
};

const newPattern = () => {
    let selected = [];
    while (selected.length != 2) {
        const randomNo = Math.floor(Math.random() * 6);
        if (selected.indexOf(randomNo) == -1) selected.push(randomNo);
    }
    return selected.forEach((v) => {
        return `stim${v}.png`;
    });
};

const checkReversal = () => {
    const items = [10, 11, 12, 13, 14, 15];
    return items[Math.floor(Math.random() * items.length)];
};

const showNextBlockLoadingScreen = () => {
    // add loading screen
};

const checkIfBlockEnded = () => {
    return timeTakeninBlock < TIME_IN_BLOCK;
};

const addPoints = (point) => {
    points += point;
};

const updatePoints = () => {};

let blocksCompleted = 0,
    timeTakeninBlock = 0,
    points = 0,
    timeTaken = 0,
    pattern1 = null,
    pattern2 = null;

const img1 = document.getElementById("img1"),
    img2 = document.getElementById("img2");

/*
// game
    // functions
        // checkIfGameEnded
        // nextBlock
        // runAfterMove
        // showBlackAfterMove
        // a function to prepare next move

    // logging
        // functions
            // initialise

    // saving
        // functions
            // saveSummary
            // saveRawData

*/

const setStyle = (hasWon, key) => {
    const face = document.getElementById("face");
    const arrow =
        key === "E"
            ? document.getElementById("arrow1")
            : key === "I"
            ? document.getElementById("arrow2")
            : null;

    if (hasWon == true) {
        face.src = "./images/smiley.png";
    } else {
        face.src = "./images/frowny.jpg";
    }

    if (arrow.style.visibility == "hidden") {
        arrow.style.visibility = "visible";
        setTimeout(() => {
            arrow.style.visibility = "hidden";
        }, 3000);
    }

    if (face.style.visibility == "hidden") {
        face.style.visibility = "visible";
        setTimeout(() => {
            face.style.visibility = "hidden";
        }, 3000);
    }
};

document.addEventListener("keydown", (e) => {
    /*
    1. catch event if e or i pressed
    2. calculate winner
    
    */
    if (e.key == "E" || e.key == "I") {
        console.log("pressed e/i");
        // probFunction to check if it has won or lost --> tells us if face is smiley or frowny
        // if smiley, then set face.src = ./images/smiley.png
        // else set face.src = ./images/frowny.jpg
        const hasWon = true;
        const keyCode = e.key;
        setStyle(hasWon, key);
    }
});

const raw_data = () => {
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

const summary_data = () => {
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
