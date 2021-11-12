var Experiment_time_start = 0;
var Experiment_time_end = 0;

var problem_time_start = 0;
var problem_time_end = 0;

var problem_times = [];     // time between attempt start and attempt end of successful solution
var attempts_time = [];
var excecution_time = [];  // time between first move and successful solution

var first_move_times = [];
var first_move = []
var first_move_time = 0;

var allmove = 0;
var str_allmove_level = [];
var str_allmove_attempt = [];
var str_allmove_exp = [];

var move_start_time = 0;

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

var tapPeg = function(peg_id) {
  var choice = Number(peg_id.slice(-1)) - 1
  var peg = original[choice]
  if (held_ball === 0) {
    for (var i = peg.length - 1; i >= 0; i--) {
      if (peg[i] !== 0) {
        held_ball = peg[i]
        peg[i] = 0
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
      str_allmove_attempt.push(t2);
      move_start_time = new Date().getTime();


      movestring = movestring + colors[held_ball-1].slice(0,1)+peg_id.slice(-1);
      curr_data[5] = movestring;
      held_ball = 0
      if(num_moves === 0 && num_trials <= 2){
        move_start_time = new Date().getTime();
        first_move_time = new Date().getTime();
        var firstmove = (first_move_time - problem_time_start) /1000 ;
        first_move.push(firstmove);
      }
      num_moves += 1;
      curr_data[7] = num_moves;
      curr_data[6] = num_moves- moves[problem];
      data.push(curr_data.slice())
    }
  }
  var b1 = getPractice();
  document.getElementById('main').innerHTML = b1;
}

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

function onsuccess(){
  problem_time_end = new Date().getTime();
  var timeTaken = (problem_time_end - problem_time_start) / 1000;
  attempts_time.push(timeTaken);

   problem_times.push(attempts_time);
   //excecution_time.push(timeTaken-first_move.slice(-1));
   first_move_times.push(first_move);


  
  original = [
    [1, 2, 0],
    [3, 0],
    [0]
  ];
  points = points + 3 - num_trials;
  curr_data[14]=1
  curr_data[15]=3-num_trials
  curr_data[16]=points
  curr_data[2] = 0;
  curr_data[1] = "feedback";
  data.push(curr_data.slice())
  held_ball=0;
  problem+=1;
  num_moves=0;
  num_trials = 0;
  var b1 = getPractice();
  document.getElementById('main').innerHTML = b1;
}

function onfail(){
  // problem_time_end = new Date().getTime();
  // var timeTaken = (problem_time_end - problem_time_start) / 1000;
  if(num_trials <= 2){
    attempts_time.push(-1);
    problem_time_start = new Date().getTime();
    excecution_time.push(-1);
    if(first_move.length > num_trials) {
      first_move.pop();
    }
    first_move.push(-1);
  }if(num_trials > 2){
    first_move = [-1,-1,-1];
  }
  original = [
    [1, 2, 0],
    [3, 0],
    [0]
  ];
  held_ball=0;
  num_moves=0;
  num_trials +=1;
  movestring="";
  curr_data[1] = "reset";
  curr_data[11] = num_trials;
  data.push(curr_data.slice())
  if(num_trials>2){
    problem_times.push(attempts_time);
    console.log("fail: ", first_move);
    first_move_times.push(first_move);
    first_move= [];
    problem+=1;
    num_trials=0;
  }
  var b1 = getPractice();
  document.getElementById('main').innerHTML = b1;
}

function onfinish(){
  Experiment_time_end = new Date().getTime();
  var exp_time = (Experiment_time_end - Experiment_time_start) / 1000;
  console.log("Total time taken is:", exp_time);
  
  original = [
    [1, 2, 0],
    [3, 0],
    [0]
  ];
  held_ball=0;
  num_moves=0;
  num_trials=0;
  problem=0;

  console.log("problem times: ", problem_times);
  console.log("first move time: " , first_move_times);
  download_csv_file();
}

function next(){
  prev_prob = problem;
  problem_time_start = new Date().getTime();
  attempts_time = [];
  
  movestring ="";
  curr_data = [0,0,0,0,0,movestring,0,0,0,0,0,1,problem+1,moves[problem],0,0,points]
  var b1 = getPractice();
  document.getElementById('main').innerHTML = b1;
}

var currInfo= function(){
  var problemno = problem+1
  var attempt = num_trials+1
  var out = '<div>allowed moves:' + moves[problem] + '</div><div>attempt:' + attempt+ '</div><div>problem number:' + problemno + '</div><div>your moves:' + num_moves+ '</div>'
  return out
}

var getPractice = function() {
  if(problem === 0){
    Experiment_time_start = new Date().getTime();
  }
  if(problem>=configurations.length){
    var feedback = '<div><h1>To download data press the button below. Your points- '+ points +'</h1></div>'
    var button = '<div><input type= "button" onclick = "onfinish()">download</input></div>'
    return feedback + button
  }
  else if(prev_prob!== problem){
    first_move = [];
    var probno = problem+1;    
    var text = '<div><h1>the next problem is problem number'+ probno+'. Press next to begin</h1></div>'
    var button = '<div><input type= "button" onclick = "next()">next</input></div>'
    return button +text
  }
  else if(checkEquality(original,configurations[problem])){
    problem_time_end = new Date().getTime();
    var referenceBoard = drawBoard('your_board', original, 'ref')
    var goal = drawBoard('goal_board', configurations[problem],'target')

    var time1 = problem_time_end - problem_time_start;
    time1 = (time1/1000) % 1000;
    var TimeTaken = '<p>You took ' + time1 + '<p> s for problem number: '+ problem + '</p> <br>';
    var canvas = '<div class = tol_canvas><div class="tol_vertical_line"></div></div>'
    var feedback = '<div><h1>You got it!!</h1></div>'
    var button = '<div><input type= "button" onclick = "onsuccess()">next</input></div>'
    return canvas + referenceBoard + goal + TimeTaken + feedback + button
  }
  // else if(num_moves>=moves[problem]){
  //   var referenceBoard = drawBoard('your_board', original, 'ref')
  //   var goal = drawBoard('goal_board', configurations[problem],'target')
  //   var canvas = '<div class = tol_canvas><div class="tol_vertical_line"></div></div>'
  //   if(num_trials>=2){
  //     var feedback = '<div><h1>You have exceeded number of trials</h1></div>'
  //   }
  //   else{
  //     var feedback = '<div><h1>Try again :(</h1></div>'
  //   }
  //   var button = '<div><input type= "button" onclick = "onfail()">next</input></div>'
  //   return canvas + referenceBoard + goal + feedback + button
  // }
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
    var button = '<div><br><br><input type= "button" onclick = "onfail()">reset</input></div>'
    return canvas + currinfo + referenceBoard + goal + hold_box + button
  }
}
var prev_prob =0;
var points = 0;
var problem = 0;
var configurations = [
  [
    [0, 0, 0],
    [3, 1],
    [2]
  ],
  [
    [1, 0, 0],
    [2, 0],
    [3]
  ]//,
  // [
  //   [1, 3, 0],
  //   [2, 0],
  //   [0]
  // ],
  // [
  //   [1, 0, 0],
  //   [2, 3],
  //   [0]
  // ],
  // [
  //   [2, 1, 0],
  //   [3, 0],
  //   [0]
  // ],
  // [
  //   [3, 0, 0],
  //   [2, 1],
  //   [0]
  // ],
  // [
  //   [2, 3, 0],
  //   [0, 0],
  //   [1]
  // ],
  // [
  //   [0, 0, 0],
  //   [2, 3],
  //   [1]
  // ],
  // [
  //   [2, 1, 3],
  //   [0, 0],
  //   [0]
  // ],
  // [
  //   [2, 3, 1],
  //   [0, 0],
  //   [0]
  // ],
  // [
  //   [3, 1, 0],
  //   [2, 0],
  //   [0]
  // ],
  // [
  //   [3, 0, 0],
  //   [2, 0],
  //   [1]
  // ]
];

var moves = [2, 2, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5]

var num_moves = 0;
var num_trials =0;
var colors = ['Green', 'Red', 'Blue'];
var original = [
  [1, 2, 0],
  [3, 0],
  [0]
];

var held_ball = 0;



var movestring = "";


// ----each move
// 0 - move execution time
// 1 - last moved disc //
// 2 - peg it was moved to //
// 3 - choice start (abs)
// 4 - choice end (abs)
// 5 - move string //
// 6 - excess moves//
// 7 - your moves//
// ----each attempt
// 8 - first move time
// 9 - execution time
// 10 - solution time
// 11 - number of attempts //
// ----each prob
// 12 - problem number //
// 13 - min moves //
// 14 - true/false //
// 15 - problem score //
// 16 - total score //






var data = [];  
var curr_data = [];

function download_csv_file() {  

   var csv = 'move_exec_time,last_disc,peg_to,choice_start,choice_end,moves,excess_moves,your_moves,first_move_time,exec_time,sol_time,attempt_no,prob_no,min_moves,success,prob_score,total_score\n';  

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