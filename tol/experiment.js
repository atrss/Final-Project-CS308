/*
This file contains the different helper functions which are used for various tasks.
*/

var checkEquality = function(arr1, arr2) {
  if (arr2.length !== arr1.length)
    return false;
  for (var i = arr1.length; i--;) {
    if (arr2[i] !== arr1[i])
      return false;
  }
  return true;
}


var stimulus1 = function() {
  var referenceBoard = drawBoard('your_board', original, 'ref')
  var goal = pegBoard('peg_board', configurations[problem_i])
  var canvas = '<div class = tol_canvas><div class="tol_vertical_line"></div></div>'
  var hold_box;
  if (held_ball !== 0) {
    ball = colors[held_ball - 1]
    hold_box = '<div class = tol_hand_box><div class = "tol_hand_ball tol_' + ball +
      '"><div class = tol_ball_label>' + ball[0] +
      '</div></div></div><div class = tol_hand_label><strong>Current ball</strong></div>'
  } else {
    hold_box =
      '<div class = tol_hand_box></div><div class = tol_hand_label><strong>Current Ball</strong></div>'
  }
  return canvas + referenceBoard + goal + hold_box
}
function assessPerformance() {
  /* Function to calculate the "credit_var", which is a boolean used to
  credit individual experiments in expfactory.
   */
  var experiment_data = jsPsych.data.getTrialsOfType('single-stim-button');
  var missed_count = 0;
  var trial_count = 0;
  var rt_array = [];
  var rt = 0;
  var avg_rt = -1;
  //record choices participants made
  for (var i = 0; i < experiment_data.length; i++) {
    trial_count += 1
    rt = experiment_data[i].rt
    if (rt == -1) {
      missed_count += 1
    } else {
      rt_array.push(rt)
    }
  }
  //calculate average rt
  if (rt_array.length !== 0) {
    avg_rt = math.median(rt_array)
  } else {
    avg_rt = -1
  }
  credit_var = (avg_rt > 100)
  jsPsych.data.addDataToLastTrial({"credit_var": credit_var})
}



var getPractice = function() {
  var referenceBoard = drawBoard('your_board', original, 'ref')
  var goal = pegBoard('peg_board', example_problem3)
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
  return canvas + referenceBoard + goal + hold_box
}

var fbOb = function() {
  var data = jsPsych.data.getLastTrialData()
  var target = data.target
  var flagEq = true
  correct = false
  for (var i = 0; i < target.length; i++) {
    flagEq = checkEquality(target[i], data.current_position[i])
    if (flagEq === false) {
      break;
    }
  }
  var feedback;
  if (flagEq === true) {
    feedback = "Success!!"
    correct = true
  } else {
    feedback = "Sorry, time is finished :("
  }
  var referenceBoard = drawBoard('your_board', original)
  var goal = pegBoard('peg_board', target)
  var canvas = '<div class = tol_canvas><div class="tol_vertical_line"></div></div>'
  var feedback_box = '<div class = tol_feedbackbox><p class = center-text>' + feedback +
    '</p></div>'
  return canvas + referenceBoard + goal + feedback_box
}


var obtainTime = function() {
  if ((time_per_trial - timeTaken) > 0) {
    return time_per_trial - timeTaken
  } else {
    return 1
  }
  
}

var getText = function() {
  return '<div class = centerbox><p class = center-block-text>The next problem is problem ' + (problem_i + 2) +
    '. Press the <strong> Enter key</strong> to continue.</p></div>'
}

var tapPeg = function(peg_id) {
  var choice = Number(peg_id.slice(-1)) - 1
  var peg = original[choice]
  var ball_location = 0
  if (held_ball === 0) {
    for (var i = peg.length - 1; i >= 0; i--) {
      if (peg[i] !== 0) {
        held_ball = peg[i]
        peg[i] = 0
        num_moves += 1
        break;
      }
    }
  } else {
    var open_spot = peg.indexOf(0)
    if (open_spot != -1) {
      peg[open_spot] = held_ball
      held_ball = 0
    }
  }
}

var drawBoard = function(container, ball_placement, board_type) {
  var board = '<div class = tol_' + container + '><div class = tol_base></div>'
  if (container == 'your_board') {
    board += '<div class = tol_board_label><strong>Current Board</strong></div>'
  } else {
    board += '<div class = tol_board_label><strong>Goal</strong></div>'
  }
  for (var p = 0; p < 3; p++) {
    board += '<div id = tol_peg_' + (p + 1) + '><div class = tol_peg></div></div>' //place peg
      //place balls
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
        ball = colors[peg[b] - 1]
        board += '<div class = "tol_ball tol_' + ball + '"><div class = tol_ball_label>' + ball[0] +
          '</div></div>'
      }
    }
    board += '</div>'
  }
  board += '</div>'
  return board
}


var pegBoard = function(container, ball_placement, board_type) {
  var board = '<div class = tol_' + container + '><div class = tol_base></div>'
  if (container == 'your_board') {
    board += '<div class = tol_board_label><strong>Current Board</strong></div>'
  } else {
    board += '<div class = tol_board_label><strong>Goal</strong></div>'
  }
  for (var p = 0; p < 3; p++) {
    board += '<div id = tol_peg_' + (p + 1) + '><div class = tol_peg></div></div>' //place peg
      //place balls
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
        ball = colors[peg[b] - 1]
        board += '<div class = "tol_ball_peg tol_' + ball + '"><div class = tol_peg_ball_label>' + ball[0] +
          '</div></div>'
      }
    }
    board += '</div>'
  }
  board += '</div>'
  return board
}


var getInstructFeedback = function() {
  return '<div class = instruct><div class = centerbox><p class = center-block-text>' + feedback_instruct_text +
    '</p></div></div>'
}

/* ************************************ */
/* Define experimental variables */
/* ************************************ */
// generic task variables
var sumInstructTime = 0 //ms
var instructTimeThresh = 0 ///in seconds
var credit_var = true

// task specific variables
var correct = false
var exp_stage = 'practice'
var colors = ['Green', 'Red', 'Blue']
var problem_i = 0
var time_per_trial = 1000000 //time per trial in seconds
var timeTaken = 0 //tracks time for a problem
var num_moves = 0 //tracks number of moves for a problem
  /*keeps track of peg board (where balls are). Lowest ball is the first value for each peg.
  So the initial_placement has the 1st ball and 2nd ball on the first peg and the third ball on the 2nd peg.
  */
  // make Your board
var original = [
  [1, 2, 0],
  [3, 0],
  [0]
]
var example_problem1 = [
  [1, 2, 0],
  [0, 0],
  [3]
]
var example_problem2 = [
  [1, 0, 0],
  [3, 0],
  [2]
]
var example_problem3 = [
  [1, 0, 0],
  [3, 2],
  [0]
]
var referenceBoard = drawBoard('your_board', original)
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
]
// var answers = [2, 2, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5]
var answers = [2,  5]
var held_ball = 0

/* ************************************ */
/* Set up jsPsych blocks */
/* ************************************ */
//Set up post task questionnaire
var afterTask = {
   type: 'survey-text',
   data: {
       trial_id: "post task questions"
   },
   questions: ['<p class = center-block-text style = "font-size: 20px">How was the experience of solving the task?</p>',
              '<p class = center-block-text style = "font-size: 20px">We would appreciate if you could give us some valuable feedback.</p>'],
   rows: [15, 15],
   columns: [60,60]
};

/* define static blocks */
var finish_block = {
  type: 'poldrack-text',
  data: {
    trial_id: "end",
    // exp_id: 'tower_of_london'
  },
  timing_response: 180000,
  text: '<div class = centerbox><p class = center-block-text>Hey, thank you for taking part in the experiment!</p><p class = center-block-text>Press <strong>enter</strong> to continue.</p></div>',
  cont_key: [13],
  timing_post_trial: 0,
  on_finish: assessPerformance
};

var feedback_instruct_text =
  '<div class = text2>Welcome to the Tower of London Experiment.</div><br> The Tower of London test is a test used in applied clinical neuropsychology for the assessment of executive functioning specifically to assess the planning ability of the user.<br> We will be really grateful if you could devote 5 minutes of your time to this experiment.<br> Press <strong>Enter</strong> to begin.'
var feedback_instruct_block = {
  type: 'poldrack-text',
  data: {
    trial_id: "instruction"
  },
  cont_key: [13],
  text:getInstructFeedback,
  timing_post_trial: 0,
  timing_response: 180000
};
/// This ensures that the subject does not read through the instructions too quickly.  If they do it too quickly, then we will go over the loop again.
var instructions_block = {
  type: 'poldrack-instructions',
  data: {
    trial_id: "instruction"
  },
  pages: [
    '<div class = tol_topbox><p>You will be presented with 2 boards at a time in this task. The two boards will have balls of different colour arranged on pegs like it is shown below:</p></div>' +
    referenceBoard + pegBoard('peg_board', example_problem1) +
    '<div class = tol_bottombox><p>You have to assume that the coloured balls have holes through their body and the pegs are going through the holes. Note that the pegs are of different heights and the 1st peg can hold 3 balls, the 2nd peg can hold 2 balls, and the third peg can hold just a single ball.</p></div>',
    '<div class = tol_topbox><p class = block-text>Your task will be to make the arrangements of balls in your board look like the arrangements of balls in the target board in the fewest possible moves.</p></div>' +
    referenceBoard + pegBoard('peg_board', example_problem1) +
    '<div class = tol_bottombox><p>You cannot make any changes in the target board but you are free to move the balls in your own board. Your task is to move the balls in such a way that your board looks exactly like the target board. It may involve the movement of balls from one peg to another. You have to be try that you take the <strong>minimum </strong> possible moves to make your board looks exactly look like the target board. You will have 20 seconds to make your decision. After 20 seconds, there will be a timeout and the next board configuration will be loaded.</p></div>',
    '<div class = tol_topbox><p class = block-text>Here is an example. Notice that the balls in your board are in a different arrangement than in the target board. If we move the red ball from the first peg in your board to the third peg then it would look like the target board.</p></div>' +
    referenceBoard + pegBoard('peg_board', example_problem2) + '<div class = tol_bottombox></div>',

    "<div class = instruct><div class><div class = fix><p class = block-text>During the test you will move the balls on your board by clicking on the pegs. When you click on a peg, the top ball will move into a box called 'your hand'. When you click on another peg, the ball in 'your hand' will move to the top of that peg.</p><p class = block-text>If you try to select a peg with no balls or try to place a ball on a full peg, nothing will happen. If you successfully make your board look like the target board, the trial will end and you will move to the next problem.</p><p class = block-text>We will start with an easy example so that you can learn the controls.</p></div></div></div>"
  ],
  allow_keys: false,
  show_clickable_nav: true,
  timing_post_trial: 1000
};

var instructBlock = {
  timeline: [feedback_instruct_block, instructions_block],
  /* This function defines stopping criteria */
  loop_function: function(data) {
    for (i = 0; i < data.length; i++) {
      if ((data[i].trial_type == 'poldrack-instructions') && (data[i].rt != -1)) {
        rt = data[i].rt
        sumInstructTime = sumInstructTime + rt
      }
    }
    if (sumInstructTime <= instructTimeThresh * 1000) {
      feedback_instruct_text =
        'Read through instructions too quickly.  Please take your time and make sure you understand the instructions.  Press <strong>enter</strong> to continue.'
      return true
    } else if (sumInstructTime > instructTimeThresh * 1000) {
      feedback_instruct_text =
        'Done with instructions. Press <strong>enter</strong> to continue.'
      return false
    }
  }
}


var beginEx = {
  type: 'poldrack-text',
  data: {
    trial_id: "instruction"
  },
  timing_response: 180000,
  text: '<div class = centerbox><p class = block-text>We will now start Problem 1. There will be ' +
    configurations.length + ' configurations to complete. <br> <br> Press <strong>enter</strong> to begin.</p></div>',
  cont_key: [13],
  timing_post_trial: 1000,
  on_finish: function() {
    exp_stage = 'test'
    held_ball = 0
    timeTaken = 0
    num_moves = 0;
    original = [
      [1, 2, 0],
      [3, 0],
      [0]
    ]
  }
};

var nextProblem = {
  type: 'poldrack-text',
  data: {
    trial_id: "advance",
    exp_stage: 'test'
  },
  timing_response: 180000,
  text: getText,
  cont_key: [13],
  on_finish: function() {
    held_ball = 0
    timeTaken = 0
    problem_i += 1;
    num_moves = 0;
    original = [
      [1, 2, 0],
      [3, 0],
      [0]
    ]
  }
}

var practice_tohand = {
  type: 'single-stim-button',
  stimulus: getPractice,
  button_class: 'special',
  is_html: true,
  data: {
    trial_id: "to_hand",
    exp_stage: 'practice'
  },
  timing_stim: obtainTime,
  timing_response: obtainTime,
  timing_post_trial: 0,
  on_finish: function(data) {
    if (data.mouse_click != -1) {
      timeTaken += data.rt
    } else {
      timeTaken += obtainTime()
    }
    jsPsych.data.addDataToLastTrial({
      'current_position': jQuery.extend(true, [], original),
      'num_moves_made': num_moves,
      'target': example_problem3,
      'min_moves': 1,
      'problem_id': 'practice'
    })
  }
}

var practice_toboard = {
  type: 'single-stim-button',
  stimulus: getPractice,
  button_class: 'special',
  is_html: true,
  data: {
    trial_id: "to_board",
    exp_stage: 'practice'
  },
  timing_stim: obtainTime,
  timing_response: obtainTime,
  timing_post_trial: 0,
  on_finish: function(data) {
    if (data.mouse_click != -1) {
      timeTaken += data.rt
    } else {
      timeTaken += obtainTime()
    }
    jsPsych.data.addDataToLastTrial({
      'current_position': jQuery.extend(true, [], original),
      'num_moves_made': num_moves,
      'target': example_problem3,
      'min_moves': 1,
      'problem_id': 'practice'
    })
  }
}

var test_tohand = {
  type: 'single-stim-button',
  stimulus: stimulus1,
  button_class: 'special',
  is_html: true,
  data: {
    trial_id: "to_hand",
    exp_stage: 'test'
  },
  timing_stim: obtainTime,
  timing_response: obtainTime,
  timing_post_trial: 0,
  on_finish: function(data) {
    if (data.mouse_click != -1) {
      timeTaken += data.rt
    } else {
      timeTaken += obtainTime()
    }
    jsPsych.data.addDataToLastTrial({
      'current_position': jQuery.extend(true, [], original),
      'num_moves_made': num_moves,
      'target': configurations[problem_i],
      'min_moves': answers[problem_i],
      'problem_id': problem_i
    })
  }
}

var test_toboard = {
  type: 'single-stim-button',
  stimulus: stimulus1,
  button_class: 'special',
  is_html: true,
  data: {
    trial_id: "to_board",
    exp_stage: 'test'
  },
  timing_stim: obtainTime,
  timing_response: obtainTime,
  timing_post_trial: 0,
  on_finish: function(data) {
    if (data.mouse_click != -1) {
      timeTaken += data.rt
    } else {
      timeTaken += obtainTime()
    }
    jsPsych.data.addDataToLastTrial({
      'current_position': jQuery.extend(true, [], original),
      'num_moves_made': num_moves,
      'target': configurations[problem_i],
      'min_moves': answers[problem_i],
      'problem_id': problem_i
    })
  }
}

var sectFeedback = {
  type: 'poldrack-single-stim',
  stimulus: fbOb,
  choices: 'none',
  is_html: true,
  data: {
    trial_id: 'feedback'
  },
  timing_stim: 2000,
  timing_response: 2000,
  timing_post_trial: 500,
  on_finish: function() {
    jsPsych.data.addDataToLastTrial({
      'exp_stage': exp_stage,
      'problem_time': timeTaken,
      'correct': correct
    })
  },
}

var pracBlock = {
  timeline: [practice_tohand, practice_toboard],
  loop_function: function(data) {
    if (timeTaken >= time_per_trial) {
      return false
    }
    data = data[1]
    var target = data.target
    var flagEq = true
    for (var i = 0; i < target.length; i++) {
      flagEq = checkEquality(target[i], data.current_position[i])
      if (flagEq === false) {
        break;
      }
    }
    return !flagEq
  },
  timing_post_trial: 1000
}

var probBlock = {
  timeline: [test_tohand, test_toboard],
  loop_function: function(data) {
    if (timeTaken >= time_per_trial) {
      return false
    }
    data = data[1]
    var target = data.target
    var flagEq = true
    for (var i = 0; i < target.length; i++) {
      flagEq = checkEquality(target[i], data.current_position[i])
      if (flagEq === false) {
        break;
      }
    }
    return !flagEq
  },
  timing_post_trial: 1000
}

/* create experiment definition array */
var tower_of_london_experiment = [];
tower_of_london_experiment.push(instructBlock);
tower_of_london_experiment.push(pracBlock);
tower_of_london_experiment.push(sectFeedback)
tower_of_london_experiment.push(beginEx);
for (var i = 0; i < configurations.length; i++) {
  tower_of_london_experiment.push(probBlock);
  tower_of_london_experiment.push(sectFeedback)
  if (i != configurations.length-1) {
    tower_of_london_experiment.push(nextProblem)
  }
}
tower_of_london_experiment.push(afterTask)
tower_of_london_experiment.push(finish_block);