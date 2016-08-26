$(document).ready(function(){
	var board = [[1,0,1,0,1,0,1,0],
				 [0,1,0,1,0,1,0,1],
				 [1,0,1,0,1,0,1,0],
				 [0,1,0,1,0,1,0,1],
				 [1,0,1,0,1,0,1,0],
				 [0,1,0,1,0,1,0,1],
				 [1,0,1,0,1,0,1,0],
				 [0,1,0,1,0,1,0,1]]
	var pokemon;

	var tB = {
		"p1": {x:1,y:0,id:129,checked:false}, 
		"p2": {x:1,y:1,id:129,checked:false}, 
		"p3": {x:1,y:2,id:129,checked:false}, 
		"p4": {x:1,y:3,id:129,checked:false},
		"p5": {x:1,y:4,id:129,checked:false},
		"p6": {x:1,y:5,id:129,checked:false},
		"p7": {x:1,y:6,id:129,checked:false},
		"p8": {x:1,y:7,id:129,checked:false},
		"r1": {x:0,y:0,id:35,checked:false}, 
		"r2": {x:0,y:7,id:35,checked:false}, 
		"k1": {x:0,y:1,id:23,checked:false}, 
		"k2": {x:0,y:6,id:23,checked:false}, 
		"b1": {x:0,y:2,id:22,checked:false}, 
		"b2": {x:0,y:5,id:22,checked:false}, 
		"kg": {x:0,y:4,id:34,checked:false}, 
		"qn": {x:0,y:3,id:31,checked:false}
	}

	var tR = {
		"p1": {x:6,y:0,id:129,checked:false}, 
		"p2": {x:6,y:1,id:129,checked:false}, 
		"p3": {x:6,y:2,id:129,checked:false}, 
		"p4": {x:6,y:3,id:129,checked:false},
		"p5": {x:6,y:4,id:129,checked:false},
		"p6": {x:6,y:5,id:129,checked:false},
		"p7": {x:6,y:6,id:129,checked:false},
		"p8": {x:6,y:7,id:129,checked:false},
		"r1": {x:7,y:0,id:35,checked:false}, 
		"r2": {x:7,y:7,id:35,checked:false}, 
		"k1": {x:7,y:1,id:23,checked:false}, 
		"k2": {x:7,y:6,id:23,checked:false}, 
		"b1": {x:7,y:2,id:22,checked:false}, 
		"b2": {x:7,y:5,id:22,checked:false}, 
		"kg": {x:7,y:3,id:34,checked:false}, 
		"qn": {x:7,y:4,id:31,checked:false}
	}
	var table = ""
	var teamB = {}
	var teamR = {}
	//This section creates the game board in conjunction with the var board
	for (var i = 0; i < 8; i++) {
		table += "<div class='row'>"
		for(var j=0; j<8; j++){
			if(board[i][j] == 1){
					table += "<div class='red' x='"+i+"' y='"+j+"'></div>"
			}
			else{
					table += "<div class='black' x='"+i+"' y='"+j+"'></div>"
			}
		}
		table += "</div>"
	}
	$('#GameBoard').html(table)
	//This section creates the game pieces for Team Blue in conjunction with the var tB
	for(key in tB){
		$.ajax({
			url: 'http://pokeapi.co/api/v2/pokemon/'+tB[key]['id']+'/',
			method: "get",
			success: function(data){
				for(key in tB){
					if(tB[key]['id'] == data['id'] && tB[key]['checked']==false){
						teamB[key] = data
						$('body').append("<img class='pieceB' src='" + data['sprites']['front_default'] + "' id='tB-" + key + "' variable='tB' key='"+key+"'>")
						$('#teamB').append("<li id='name-tB-"+key+"' variable='tB' key='"+key+"'>"+key+" - "+ data['name']+"</li>")
						document.getElementById('tB-'+key).style.left = (tB[key]['y'] * 100) + "px";
						document.getElementById('tB-'+key).style.top = (tB[key]['x'] * 100) + "px";
						tB[key]['checked'] = true;
						break
					}
				}
			}
		})
	}
	//This section creates the game pieces for Team Red in conjunction with the var tR
	for(key in tR){
		$.ajax({
			url: 'http://pokeapi.co/api/v2/pokemon/'+tR[key]['id']+'/',
			method: "get",
			success: function(data){
				for(key in tR){
					if(tR[key]['id'] == data['id'] && tR[key]['checked']==false){
						teamR[key] = data
						$('body').append("<img class='pieceR' src='" + data['sprites']['front_default'] + "' id='tR-" + key + "' variable='tR' key='"+key+"'>")
						$('#teamR').append("<li id='name-tR-"+key+"' variable='tR' key='"+key+"'>"+key+" - "+ data['name']+"</li>")
						document.getElementById('tR-'+key).style.left = (tR[key]['y'] * 100) + "px";
						document.getElementById('tR-'+key).style.top = (tR[key]['x'] * 100) + "px";
						tR[key]['checked'] = true;
						break
					}
				}
			}
		})
	}
	//This Creates the button to remove the selected pokemon from the game
	$(document).on('click', 'img', function(){
		var variable = $(this).attr('variable')
		var key = $(this).attr('key')
		$('#button2').html('<button id="remove" variable="'+ variable+'" key="'+ key+'">Remove?</button>')
	})
	//This Removes the pokemon and the name from the game
	$(document).on('click', '#remove', function(){
		var variable = $(this).attr('variable')
		var key = $(this).attr('key')
		$('#'+variable+'-'+key).remove()
		$('#name-'+variable+'-'+key).remove()
		$('#button2').html('')
	})
})