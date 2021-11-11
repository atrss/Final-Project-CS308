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
      } else {
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
      held_ball = 0
      num_moves += 1
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
  original = [
    [1, 2, 0],
    [3, 0],
    [0]
  ];
  points = points + 3 - num_trials;
  held_ball=0;
  problem+=1;
  num_moves=0;
  num_trials = 0;
  var b1 = getPractice();
  document.getElementById('main').innerHTML = b1;
}

function onfail(){
  original = [
    [1, 2, 0],
    [3, 0],
    [0]
  ];
  held_ball=0;
  num_moves=0;
  num_trials +=1;
  if(num_trials>2){
    problem+=1;
    num_trials=0;
  }
  var b1 = getPractice();
  document.getElementById('main').innerHTML = b1;
}

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
  //download data
}

function next(){
  prev_prob = problem;
  var b1 = getPractice();
  document.getElementById('main').innerHTML = b1;
}

var currData= function(){
  var problemno = problem+1
  var attempt = num_trials+1
  var out = '<div>allowed moves:' + moves[problem] + '</div><div>attempt:' + attempt+ '</div><div>problem number:' + problemno + '</div><div>your moves:' + num_moves+ '</div>'
  return out
}

var getPractice = function() {
  if(problem>=configurations.length){
    var feedback = '<div><h1>To download data press the button below. Your points- '+ points +'</h1></div>'
    var button = '<div><input type= "button" onclick = "onfinish()">download</input></div>'
    return feedback + button
  }
  else if(prev_prob!== problem){
    var probno = problem+1;
    var text = '<div><h1>the next problem is problem number'+ probno+'. Press next to begin</h1></div>'
    var button = '<div><input type= "button" onclick = "next()">next</input></div>'
    return button +text
  }
  else if(checkEquality(original,configurations[problem])){
    var referenceBoard = drawBoard('your_board', original, 'ref')
    var goal = drawBoard('goal_board', configurations[problem],'target')
    var canvas = '<div class = tol_canvas><div class="tol_vertical_line"></div></div>'
    var feedback = '<div><h1>You got it!!</h1></div>'
    var button = '<div><input type= "button" onclick = "onsuccess()">next</input></div>'
    return canvas + referenceBoard + goal + feedback + button
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
    var currdata = currData()
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
    return canvas + currdata + referenceBoard + goal + hold_box + button
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



var b1 = getPractice();
document.getElementById('main').innerHTML = b1;

