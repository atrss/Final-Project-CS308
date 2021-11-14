/**
 * @module
 */

/**
 * global variable to store the time for start of each attempt
*/
var problem_time_start = 0;

/**
 * global variable to store the time for the ending of each attempt
*/
var problem_time_end = 0;

/**
 * global variables used for intermediate calculations
*/
var firstmove=0;
var first_move_time = 0;
var move_start_time = 0;

/**
 * @var - The array moves stores the minimum number of moves for all the 12 problems
*/
var moves = [2, 2, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5]

/**
 * @returns - HTML of the board with 3 pegs 
 * @param {string} container - Type of the board(user board or goal board)
 * @param {array} ball_placement - Nested array which contains arrangements of the balls on the 3 pegs
 * @param {string} board_type - Type of the board(ref board-movable or not)

 * Function which returns the HTML code which corresponds to drawing the board
with the 3 pegs and the balls on them according to ball_placement ref indicates that the board has to be responsive(the board on which the user can move balls)

 */
var drawBoard = function(container, ball_placement, board_type) {
    var board = '<div class = tol_' + container + '><div class = tol_base></div>'
    if (container == 'your_board') {
      board += '<div class = tol_board_label><strong>Current Board</strong></div>'
    } else {
      board += '<div class = tol_board_label><strong>Goal</strong></div>'
    }
    for (var p = 0; p < 3; p++) {
      board += '<div id = tol_peg_' + (p + 1) + '><div class = tol_peg></div></div>'

      if (board_type == 'ref') {
        if (ball_placement[p][0] === 0 & held_ball === 0) {
          board += '<div id = tol_peg_' + (p + 1) + ' onclick = "tapPeg(this.id)">'
        } else if (ball_placement[p].slice(-1)[0] !== 0 & held_ball !== 0) {
          board += '<div id = tol_peg_' + (p + 1) + ' onclick = "tapPeg(this.id)">'
        } else {
          board += '<div class = special id = tol_peg_' + (p + 1) + ' onclick = "tapPeg(this.id)">'
        }
      }
      else {
        board += '<div id = tol_peg_' + (p + 1) + ' >'
      }
      var peg = ball_placement[p]
      for (var b = 0; b < peg.length; b++) {
        if (peg[b] !== 0) {
          var ball = colors[peg[b] - 1]
          board += '<div class = "tol_ball tol_' + ball + '"><div class = tol_ball_label>' + ball[0] +
            '</div></div>'
        }
      }
      board += '</div>'
    }
    board += '</div>'
    return board
}

/**
 * - This function excecutes the movement of balls across the pegs while adhering to different possible cases while transfer of balls
 * - it checks if a ball held or not, if the ball is held then is places the ball of the peg with the given peg_id passed as a parameter
 * - if the ball is not held, then it check if the peg has a ball or not and picks the ball if ball is present
 * - Along with these,it also facilitates the calculation of string which depicts what moves have been made of which ball to which peg for current move
 * @param {Number} peg_id - the identifier for the specific peg
*/
var tapPeg = function(peg_id) {
  var choice = Number(peg_id.slice(-1)) - 1
  var peg = original[choice]
  if (held_ball === 0) {
    for (var i = peg.length - 1; i >= 0; i--) {
      if (peg[i] !== 0) {
        held_ball = peg[i]
        peg[i] = 0;
        move_start_time = new Date().getTime();
        break;
      }
    }
  } else {
    var open_spot = peg.indexOf(0)
    if (open_spot != -1) {
      peg[open_spot] = held_ball
      curr_data[1] = colors[held_ball-1]
      curr_data[2] = choice + 1

      var t1 = new Date().getTime();
      var t2 = t1 - move_start_time;
      t2 /= 1000;


      movestring = movestring + colors[held_ball-1].slice(0,1)+peg_id.slice(-1);
      curr_data[5] = movestring;
      held_ball = 0
      if(num_moves === 0){
        first_move_time = new Date().getTime();
        firstmove = (move_start_time-problem_time_start) /1000 ;
      }
      curr_data[4] = t2;
      curr_data[3] = "move";
      curr_data[8] = firstmove;
      num_moves += 1;
      curr_data[7] = num_moves;
      curr_data[6] = num_moves - moves[problem];
      data.push(curr_data.slice())
    }
  }
  var b1 = getPractice();
  document.getElementById('main').innerHTML = b1;
}

/**
 * @returns - true if both the arrays are equal and false if both the arrays are unequal
 * Function which checks if two nested arrays are equal
 * after every move, this function will be called to check if the configuration of user's board
 * is equal to the target board
 * @param {array} arr1 - first input array
 * @param {array} arr2 - second input array
*/
var checkEquality = function(arr1, arr2) {
  if (arr2.length !== arr1.length){
    return false;
  }
  for (var i = 0;i<arr1.length; i++) {
    if (arr2[i].length !== arr1[i].length){
      return false;
    }
    for (var j = 0;j<arr1[i].length; j++) {
      if (arr2[i][j] !== arr1[i][j]){
        return false;
      }
    }
  }
  return true;
}

/**
 *  - Function that will be executed when the user's attempt is successful 
 *  - calculates the time for this attempt
 *  - appends the time for this problem to problem_times
 *  - appends the data of the current problem to data
 *  - Resets the original board configuration for the next problem
 *  - Resets the global variables num_moves, held_ball and num_trials for the next problem
 *  - Increments the problem number
 *  - Adds the score of the current problem to the global variable points
 */
function onsuccess(){
  problem_time_end = new Date().getTime();
  var timeTaken = (problem_time_end - problem_time_start) / 1000;
  curr_data[9] = timeTaken - curr_data[8];
  curr_data[10] = timeTaken;

  original = [
    [1, 2, 0],
    [3, 0],
    [0]
  ];
  if(problem!==0){
    points = points + 3 - num_trials;
  }
  curr_data[14]=1
  curr_data[15]=3-num_trials
  curr_data[16]=points
  curr_data[2] = 0;
  curr_data[4] = 0;
  curr_data[3] = "success";
  curr_data[1] = "NaN";
  curr_data[2] = 0;
  data.push(curr_data.slice())
  held_ball=0;
  problem+=1;
  num_moves=0;
  num_trials = 0;
  var b1 = getPractice();
  document.getElementById('main').innerHTML = b1;
}

/** 
 * - Function that will be executed when the user's attempt is unsuccessful
 * - Resets the variable problem_time_start for the next attempt if the previous attempt is not the last attempt
 * - Also resets move_start_time
 * - Resets the original board configuration for the next problem
 * - Resets the global variables num_moves, held_ball for the next problem
 * - Increments num_trials as there already has been one unsuccessful attempt
 * - Increments problem variable for the next problem if the previous attempt was the last attempt.
 */
function onfail(){
  original = [
    [1, 2, 0],
    [3, 0],
    [0]
  ];
  held_ball=0;
  num_moves=0;
  num_trials +=1;
  movestring="";
  curr_data[1] = "NaN";
  curr_data[2] = 0;
  curr_data[4] = 0;
  curr_data[3] = "reset";
  curr_data[9] = -1;
  curr_data[10] = -1;
  data.push(curr_data.slice())
  curr_data[9] = 0;
  curr_data[10] = 0;
  curr_data[11] = num_trials+1;
  if(num_trials>2){
    problem_time_start = new Date().getTime();
    move_start_time = new Date().getTime();
    problem+=1;
    num_trials=0;
  }
  var b1 = getPractice();
  document.getElementById('main').innerHTML = b1;
}

/** 
 * - This function will be called when the experiment is finished and the download button is pressed by the user.
 * - Calculates the total time for the experiment
 * - Resets all the global variables
 * - Resets the original configuration
 * - Calculates the execution time for all the problems
 * - Invokes the function for downloading the .csv 
*/
function onfinish(){
  original = [
    [1, 2, 0],
    [3, 0],
    [0]
  ];
  held_ball=0;
  num_moves=0;
  num_trials=0;
  problem=0;
  download_csv_file();
}

/** 
 * - The next function will be called at the start of the next problem.
 * - Resets movestring, problem_time_start and move_start_time for the next problem and move
 * - Initializes the row to be appended in the .csv file
 * - Calls getPractice for the next problem to appear.
 */
function next(){
  prev_prob = problem;
  problem_time_start = new Date().getTime();
  move_start_time = new Date().getTime();
  movestring ="";
  curr_data = [0,0,0,0,0,movestring,0,0,0,0,0,1,problem,moves[problem],0,0,points]
  var b1 = getPractice();
  document.getElementById('main').innerHTML = b1;
}

function practice(){
  problem = 0;
  prev_prob = problem;
  problem_time_start = new Date().getTime();
  move_start_time = new Date().getTime();
  movestring ="";
  curr_data = [0,0,0,0,0,movestring,0,0,0,0,0,1,problem,moves[problem],0,0,points]
  var b1 = getPractice();
  document.getElementById('main').innerHTML = b1;
}

/** 
 * - Function which shows the information about the user's current attempt
 * - Shows the problem number, the attempt number, the allowed number of moves and the user's current number of moves.
 * @returns - The HTML code corresponding to the information displayed along with the problem
 */
var currInfo= function(){
  var problemno = problem
  var attempt = num_trials+1
  var out = '<div class = "score_canva"><div>Allowed Moves: ' + moves[problem] + '</div><div>Attempt: ' + attempt+ '</div><div>Problem Number: ' + problemno + '</div><div>Your Moves: ' + num_moves+ '</div></div>'
  return out
}


/** 
Function generates the different pages/board configurations for the game
 * - case 1: if problem >= configurations.length,
 *         This case shows that the problem number has exceeded the available problems in code i.e. the experiment has been finished and it  generates the page from where the results can be downloaded.
 * 
 * - case 2: preve_prob!= problem
 *        This case indicates that the current problem has been finished and provides a page with a button to load the next problem
 *
 * - case 3: it compares the goal board and current board, and if they both match it says that the problem has been solved succesfully and moves towards the next problem
 *
 * - case 4: This basically loads the game screen with Goal Board, Current Board, box for holding a ball along with the other details like number of attempts, allowed moves, problem number, number of moves played etc. 
 * @returns - the HTML code corresponding to a trial
 */
var getPractice = function() {
  if(problem>=configurations.length){
    var feedback = '<div class="centerv"> <div class = "text2">To download the data for your experiment, press the button below. Your score for the experiment is: '+ points +'</div>'
    var button = '<div><input type= "button" class="button-two" onclick = "onfinish()" value="Download"></input></div></div>'
    return feedback + button
  }
  else if(prev_prob!== problem){
    var probno = problem;
    var text = '<div class="centerv">  <div  class = "text2">the next problem is problem number '+ probno+'. <br> Press next to begin</div>'
    var button = '<div><input type= "button" class="button-two" onclick = "next()" value="Next" ></input></div></div>'
    return text + button
  }
  else if(checkEquality(original,configurations[problem])){
    problem_time_end = new Date().getTime();
    var referenceBoard = drawBoard('your_board', original, 'ref')
    var goal = drawBoard('goal_board', configurations[problem],'target')

    var time1 = problem_time_end - problem_time_start;
    time1 = (time1/1000) % 1000;
    var canvas = '<div class = tol_canvas></div>'
    var feedback = '<div class="text2"><h1>You got it!!</h1></div>'
    if(problem!==0){
      var button = '<div><input type= "button" class="button-two" onclick = "onsuccess()" value="Next"></input></div>'
    }
    else{
      var button = '<div><input type= "button" class="button-one" onclick = "onsuccess()" value="End Practice"></input></div>'
    }
    return canvas + referenceBoard + goal + feedback + button
  }
  else{
    var currinfo = currInfo()
    var referenceBoard = drawBoard('your_board', original, 'ref')
    var goal = drawBoard('goal_board', configurations[problem],'target')
    var canvas = '<div class = tol_canvas><div class="tol_vertical_line"></div></div>'
    var hold_box;
    if (held_ball !== 0) {
      ball = colors[held_ball - 1]
      hold_box = '<div class = tol_hand_box><div class = "tol_hand_ball tol_' + ball +
        '"><div class = tol_ball_label>' + ball[0] +
        '</div></div></div><div class = tol_hand_label><strong>Current ball</strong></div>'
    } else {
      hold_box =
        '<div class = tol_hand_box></div><div class = tol_hand_label><strong>Current ball</strong></div>'
    }
    var button = '<div class="reset"><input type= "button" class="button-two" onclick = "onfail()" value="Reset"></input></div>'
    return canvas + currinfo + referenceBoard + goal + hold_box + button
  }
}

/**
 * The variable prev_prob stores the number for the previous problem
 */
var prev_prob =0;

/** 
 *  The variable points stores the total points for the experiment
 */
var points = 0;

/**
 * The variable problem stores the current problem number(0 for the 1st problem, 1 for the 2nd problem and so on)
*/
var problem = 1;

/**
 * The variable configurations stores the arrangements of the target board for all the 12 problems
 */
var configurations = [
  [
    [1, 0, 0],
    [3, 0],
    [2]
  ],
  [
    [0, 0, 0],
    [3, 1],
    [2]
  ],
  [
    [1, 0, 0],
    [2, 0],
    [3]
  ],
  [
    [1, 3, 0],
    [2, 0],
    [0]
  ],
  [
    [1, 0, 0],
    [2, 3],
    [0]
  ],
  [
    [2, 1, 0],
    [3, 0],
    [0]
  ],
  [
    [3, 0, 0],
    [2, 1],
    [0]
  ],
  [
    [2, 3, 0],
    [0, 0],
    [1]
  ],
  [
    [0, 0, 0],
    [2, 3],
    [1]
  ],
  [
    [2, 1, 3],
    [0, 0],
    [0]
  ],
  [
    [2, 3, 1],
    [0, 0],
    [0]
  ],
  [
    [3, 1, 0],
    [2, 0],
    [0]
  ],
  [
    [3, 0, 0],
    [2, 0],
    [1]
  ]
];


/**
 * The array moves stores the minimum number of moves for all the 12 problems
 */
var moves = [1, 2, 2, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5]

/**
 * The variable num_moves stores the number of moves for the current attempt
 */
var num_moves = 0;

/**
 * The variable num_trials stores the number of attempts for the current problem
 */
var num_trials =0;

/**
 * the colors array will have green at the 0th index, red at the 1st index and blue at the 2nd index
 */
var colors = ['Green', 'Red', 'Blue'];

/** 
 * - The variable original is an array which stores the original configuration for the board of the user
 * - The first list [1,2,0] stores the arrangement for the first peg(the peg with the maximum height)
 * - (green ball at the bottom, red ball above it and empty space at the top- 0 denotes empty space)
 * - Similarly, the other two component arrays store the arrangements for the other 2 pegs.
*/
var original = [
  [1, 2, 0],
  [3, 0],
  [0]
];

/**
 * - held_ball is an integer variable denotes the state if a ball is currently held by the user.
 * - held_ball is 1 if the user currently holds a ball
 * - else it is zero
*/
var held_ball = 0;

/**
 * - stores the moves executed by the user( Eg-"B2R3" indicates that the blue ball (B) was moved to peg 2 (center) and the red ball (R) was moved to peg 3 (right).)
*/
var movestring = "";


// 0 - id 
// ----each move
// 1 - last moved disc 
// 2 - peg it was moved to 
// 3 - choice type
// 4 - move execution time
// 5 - move string 
// 6 - excess moves
// 7 - your moves
// ----each attempt
// 8 - first move time 
// 9 - execution time 
// 10 - solution time
// 11 - no of attempts
// ----each prob
// 12 - problem number
// 13 - min moves
// 14 - true/false
// 15 - problem score
// 16 - total score

/**
 * data stores the content of the entire csv file
 */
var data = [];

/** 
curr_data stores the current row of the csv file
 */
var curr_data = [];

/** 
 * - Function invoked by the call in on_finish function, downloads the csv file containing data of the experiment 
 * - adds commas for the csv format in each row
 * - names the columns
 * - saves the file as TOL.csv
 */
function download_csv_file() {
   var csv = 'user_id,last_disc,peg_to,choice,move_exec_time,moves,excess_moves,your_moves,first_move_time,exec_time,sol_time,attempt_no,prob_no,min_moves,success,prob_score,total_score\n';

   data.forEach(function(row) {
           csv += row.join(',');
           csv += "\n";
   });

   var hiddenElement = document.createElement('a');
   hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
   hiddenElement.target = '_blank';
   hiddenElement.download = 'TOL.csv';
   hiddenElement.click();
}