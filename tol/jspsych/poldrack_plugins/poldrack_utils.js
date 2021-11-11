function addID(exp_id) {
	jsPsych.data.addDataToLastTrial({
		exp_id: exp_id
	})
}
function getDisplayElement() {
  $('<div class = display_stage_background></div>').appendTo('body')
  return $('<div class = display_stage></div>').appendTo('body')
}