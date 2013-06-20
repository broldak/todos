$(document).ready(function(){
	$count = localStorage.length;
	$sep = $("#display-tasks");
	$input = $("#task-input");
	$newArray = [];
	

	
	$input.on("keydown", function(e){
		if (e.keyCode == '13' && $(this).val()!="")
		{
			console.log($tasks);
			addTask($input.val());
			$input.val("");
		}
	});
	
	function addTask(input)
	{
		$tasks.push(input);
		store($count, input);
		console.log($tasks);
		addSeparator();
		displayTasks();
		$count++;
	}
	
	
	
	function formatTime(time){
		$secondsSinceEpoch = (time / 1000) | 0;
		$secondsInDay = (($secondsSinceEpoch % 86400) + 86400) % 86400;
		$secs = $secondsInDay % 60;
		$mins = (($secondsInDay / 60) | 0) % 60;
		$hours = ($secondsInDay / 3600) | 0;
		return ($hours - 4) + ($mins < 10 ? ":0" : ":")
      + $mins;
	}
	
	function displayTasks()
	{
		$newHTML = "";
		$.each($tasks, function(i, val){
			console.log(val);
			$thisHTML = '<li class = "task"><input readonly = "true" class = "task-list-input" value ="'
			+ val + '"><a class = "destroy" href = "#">X</a></li>';
			$newHTML += $thisHTML;
		});
		
		$("#task-list").html($newHTML);
		
		$(".task").hover(function(){
			$(this).find("a").first().show();
			$(this).addClass("hover");
			if(!$(this).children().first().hasClass("editing")){
				$(this).children().first().addClass("hover");
			}
			//$link = (this "> a:first");
			//$link.show();
			//console.log(($link));
		}, function(){
			//$(this).find("a").first().hide();
			if(!$(this).children().first().hasClass("editing")){
				$(this).removeClass("hover");
				$(this).children().first().removeClass("hover");
			}
		});
		
		$('.destroy').click(function(e){
			e.preventDefault();
			console.log($(this).parent().index());
			$index = $(this).parent().index();
			$(this).parent().fadeOut(200, function(){
				$(this).remove();
				$tasks.splice($index, 1);
				localStorage.removeItem(localStorage.key($index));
				console.log($tasks);
				addSeparator();
			});
		});
		
		$('.task').dblclick(function(e){
		
			$("#task-list").find('.editing').removeClass('editing').attr('readonly',true);
		
			$it = $(this);
			$x = $(this).children().first();
			$x.attr('readonly', false);
			$x.addClass("editing");
			$x.removeClass("hover");
			
			$x.click(function(e){
				e.stopPropagation();
			});
			
			$('html').click(function(){
				$x.removeClass("editing");
				$x.attr('readonly', true);
				$x.removeClass("hover");
				$x.parent().removeClass("hover");
				$tasks[$it.index()] = $x.val();
				localStorage[localStorage.key($it.index())] = $x.val();
			});
		}
		);
		
		$('.task-list-input').keydown(function(e){
			if (e.keyCode == '13' && $(this).hasClass("editing"))
			{
				$(this).removeClass("editing");
				$(this).attr('readonly', true);
				$index = $(this).parent().index();
				$tasks[$index] = $(this).val();
				localStorage[localStorage.key($index)] = $(this).val();
				if ($(this).parent().hasClass("hover"))
				{
					$(this).addClass("hover");
				}
				$(this).children().first().removeClass("editing");
			}
		});
		
		
	}
	
	function addSeparator(){
		if ($tasks.length != 0)
		{
			console.log($sep);
			if ($sep.hasClass("hidden"))
			{
				$sep.fadeIn(200, function(){
					$sep.removeClass("hidden");
				});
			}
		}
		else{
			$sep.addClass("hidden");
		}
	}

	merge();
	function merge(){
		for (var i in localStorage)
		{
			$newArray.push(localStorage[i]);
		}
		
		if (localStorage.length == 0)
		{
			$newArray = [];
		}
		
		console.log("ADDDDDD" + $newArray);
		$tasks = $newArray;
		addSeparator();
		displayTasks();
	}
	
		$('#clearall').click(function(e){
		e.preventDefault();
		$c = confirm("Want to clear all of your to-do's?");
		if ($c == true){
			localStorage.clear();
			console.log(localStorage.length);
			merge();
		}
	});
	
	
});