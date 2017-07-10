//wait for document to load then run jQuery code
$(document).ready(function(){
	
	//add task event
	$('#add-task-form').on('submit', function(e){
    addTask(e);
	});

	//edit task event
	$('#edit-task-form').on('submit', function(e){
		updateTask(e);
	});

	//remove task event
	$('#task-table').on('click', '#remove-task', function(){
		id = $(this).data('id');
		removeTask(id);
	});

	//clear all tasks
	$('#clear-tasks').on('click', function(){
    clearAllTasks();
	});
 
  //he we call function to display tasks at start
	displayTasks();

	// Function to display tasks
	function displayTasks(){
		var taskList = JSON.parse(localStorage.getItem('tasks'));

		//sort tasks
		if(taskList != null ){
			taskList = taskList.sort(sortByTime);
		}

		// Set Counter
		var i = 0;
		// check tasks
		if( localStorage.getItem('tasks') != null ){
			// loop and display each local storage
			$.each(taskList, function(key, value){
				//append table rows =)
				$('#task-table').append('<tr id="'+ value.id +'">' + 
					'<td>' + value.task + '</td>' + 
					'<td>' + value.task_priority + '</td>' + 
					'<td>' + value.task_date + '</td>' + 
					'<td>' + value.task_time + '</td>' + 
					'<td><a href="edit.html?id='+ value.id +'">Edit</a> | <a href="#" id="remove-task" data-id="'+ value.id +'">Remove</a></td>' +
					'</tr>');
			})
		}
	}
	
	// Function to sort tasks
	function sortByTime(a, b){
		var aTime = a.task_time;
		var bTime = b.task_time;
		return ((aTime < bTime) ? -1 : ((aTime > bTime) ? 1 : 0) );
	}

	// function to add a task
	function addTask(e){
	  //unique id so we can target tasks individually
	  var newDate = new Date();
	  id = newDate.getTime();
	  var task = $('#task').val();
	  var task_priority = $('#priority').val();
	  var task_date = $('#date').val();
	  var task_time = $('#time').val();

	  // Simple Validation
	  if(task == ''){
	  	alert('Task is required');
	  	e.preventDefault();
	  } else if (task_date == '') {
	  	alert('Date is required');
	  	e.preventDefault();
	  } else if (task_time == '') {
	  	alert('Time is required');
	  	e.preventDefault();
	  } else if (task_priority == '') {
	  	task_priority = 'normal';
	  } else {

	  	//if all conditions are met
	  	tasks = JSON.parse(localStorage.getItem('tasks'));
	  	//Check Tasks
	  	if(tasks == null ){
	  		tasks = [];
	  	}

	  	var taskList = JSON.parse(localStorage.getItem('tasks'));

	  	// New Task Object
	  	var new_task = {
	  		"id": id,
	  		"task": task,
	  		"task_priority": task_priority,
	  		"task_date": task_date,
	  		"task_time": task_time
	  	}

      //push on a new task to the list
	  	tasks.push(new_task);
	  	//renew the localStorage with the new tasks list
	  	localStorage.setItem('tasks', JSON.stringify(tasks));

	  	console.log('Task Added');
	  }
	}

	//function to update tasks
	function updateTask(e){
		
		//grab info of form
		var id = $('#task_id').val();
		var task = $('#task').val();
	  var task_priority = $('#priority').val();
	  var task_date = $('#date').val();
	  var task_time = $('#time').val();

	  taskList = JSON.parse(localStorage.getItem('tasks'));

	  for( var i=0; i < taskList.length; i++ ){
	  	if( taskList[i].id == id ){
	  		//delete item from array
	  		taskList.splice(i,1);
	  	}
	  	//set local storage to the new taskList
	  	localStorage.setItem('tasks', JSON.stringify(taskList));
	  }
	  // Simple Validation
	  if(task == ''){
	  	alert('Task is required');
	  	e.preventDefault();
	  } else if (task_date == '') {
	  	alert('Date is required');
	  	e.preventDefault();
	  } else if (task_time == '') {
	  	alert('Time is required');
	  	e.preventDefault();
	  } else if (task_priority == '') {
	  	task_priority = 'normal';
	  } else {
	  	tasks = JSON.parse(localStorage.getItem('tasks'));

			//Check Tasks
			if(tasks == null){
				tasks = [];
			}

			var taskList = JSON.parse(localStorage.getItem('tasks'));
	  	// New Task Object
	  	var new_task = {
	  		"id": id,
	  		"task": task,
	  		"task_priority": task_priority,
	  		"task_date": task_date,
	  		"task_time": task_time
	  	}

      //push on a new task to the list
	  	tasks.push(new_task);
	  	//renew the localStorage with the new tasks list
	  	localStorage.setItem('tasks', JSON.stringify(tasks));
	  }
	}

	//Function to remove a task
	function removeTask(id){
		if(confirm('Are you sure you wnt to delete this task?')){
			var taskList = JSON.parse(localStorage.getItem('tasks'));
			for( var i = 0; i < taskList.length; i++ ){
				if( taskList[i].id == id ){
					taskList.splice(i,1);
				}
				localStorage.setItem('tasks', JSON.stringify(taskList));
			}

			location.reload();
		}
	}

	//Function to clear all tasks
	function clearAllTasks(){
		if(confirm('Are you sure you want to clear all tasks?')){
			localStorage.clear();
			location.reload();
		}
	}

});

// Function for getting single task
function getTask(){
	var $_GET = getQueryParams(document.location.search);
	id = $_GET['id'];

	var taskList = JSON.parse(localStorage.getItem('tasks'));

	for(var i=0; i < taskList.length; i++){
		if(taskList[i].id == id){
			$('#edit-task-form #task_id').val(taskList[i].id);
			$('#edit-task-form #task').val(taskList[i].task);
			$('#edit-task-form #priority').val(taskList[i].task_priority);
			$('#edit-task-form #date').val(taskList[i].task_date);
			$('#edit-task-form #time').val(taskList[i].task_time);
		}
	}
}

// Function to Get HTTP GET Requests
function getQueryParams(qs) {
    qs = qs.split("+").join(" ");
    var params = {},
        tokens,
        re = /[?&]?([^=]+)=([^&]*)/g;

    while (tokens = re.exec(qs)) {
        params[decodeURIComponent(tokens[1])]
            = decodeURIComponent(tokens[2]);
    }

    return params;
}