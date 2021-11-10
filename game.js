const MIN = 60,
    POINT_PROB = 0.8,
    TIME_IN_BLOCK = 9 * MIN,
    TIME_FOR_MOVE = 10 * 1000; // milliseconds

let loading = false,
    blocksCompleted = 0,
    timeTakeninBlock = 0,
    time = new Date().getTime(), // new Date().getTime()
    points = 0,
    timeTaken = 0,
    pattern1 = null,
    pattern2 = null;

const img1 = document.getElementById("img1"),
    img2 = document.getElementById("img2"),
    face = document.getElementById("face"),
    arrow1 = document.getElementById("arrow1"),
    arrow2 = document.getElementById("arrow2");

const chooseImage = () => {
    if (Math.random() > 0.5) {
        return "lucky";
    } else {
        return "unlucky";
    }
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
    document.getElementsByClassName("main")[0].style.visibility = "hidden";
    document.getElementsByClassName("loading")[0].style.display = "block";
};

const checkIfBlockEnded = () => {
    return timeTakeninBlock < TIME_IN_BLOCK;
};

const addPoints = (point) => {
    points += point;
};

const updatePoints = () => {
    document.getElementById("points").textContent = points;
};

const setStyle = (hasWon, key) => {
    const arrow = key === "E" ? arrow1 : key === "I" ? arrow2 : null;

    if (hasWon == true) {
        face.src = "./images/smiley.png";
    } else {
        face.src = "./images/frowny.jpg";
    }

    if (arrow !== null && arrow.style.visibility == "hidden") {
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

    showNextBlockLoadingScreen();
    prepareNextMove();
};

document.addEventListener("keydown", (e) => {
    if (!loading && (e.key === "E" || e.key === "I")) {
        console.log("pressed e/i");
        setStyle(true, e.key);
    }
});

const moveExpired = () => {
    if (new Date().getTime() - time > TIME_FOR_MOVE) {
        setStyle(false, null);
    }
};

setInterval(moveExpired, 100);

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
