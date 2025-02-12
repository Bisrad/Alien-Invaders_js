const btn_start = document.querySelector(".startButton");
	const myShip = document.querySelector(".myShip");
	const container = document.querySelector(".container");
	const fireme = document.querySelector(".fireme hide");
	const scoreOutput = document.querySelector(".score");

 	const containerDim = container.getBoundingClientRect();
	btn_start.addEventListener("click",startGame);
	let player = {
		score: 0,
		speed: 5,
		gameOver: true,
		fire: false,
		alienSpeed: 5,

	}
let keyV = {};
	document.addEventListener("keydown",function(e){
		let key = e.keyCode;
		if(key===37){
			keyV.left = true;
		}
		else if(key===39){
			keyV.right = true;
		}
		else if(key===38 || key === 32){
			if(player.fire){
				addShoot();
			}
		}
	})
	document.addEventListener("keyup",function(e){
		let key = e.keyCode;
		if(key===37){
			keyV.left = false;
		}else if(key===39){
			keyV.right = false;
		}
	})

	function startGame(){
		if(player.gameOver){
			player.gameOver = false;
			btn_start.style.display = "none";
			player.alienSpeed = 5;
			setupAliens(5);
			console.log("start game");
			player.animFrame = requestAnimationFrame(update);
	}

	function setupAliens(num){
		let tempWidth = 100;
		let lastCol = containerDim.width - 100;
		let row = {
			x: containerDim.left
			,y:50
		}
		
		for(let x=0;x<num;x++){
			if(row.x >(lastCol - tempWidth)){
				row.y =+ 70;
				row.x = containerDim.left + 50
			}
			alienMaker(row,tempWidth);
			row.x += tempWidth + 10;
		}
}

	function randomColor() {
		return "#"+ Math.random().toString(16).substr(-6);
	}

	function alienMaker(row,tempWidth){
		console.log(row);
		let div	= document.createElement("div");
		div.classList.add("alien");
		div.style.backgroundColor = randomColor();

			let eye1 = document.createElement("span");
			eye1.classList.add("eye1");
			eye1.style.left = "10px";
			div.appendChild(eye1);

			let eye2 = document.createElement("span");
			eye2.classList.add("eye1");
			eye2.style.right = "10px";
			div.appendChild(eye2);

			let mouth = document.createElement("span");
			mouth.classList.add("mouth");
			div.appendChild(mouth);
			

			div.style.width = tempWidth + "px";
			div.xpos = Math.floor(row.x);
			div.ypos = Math.floor(row.y);

			div.style.left = div.xpos + "px";
			div.style.top = div.ypos + "px";
			
			container.appendChild(div);
			console.log(div);
	}

	function addShoot(){
		player.fire = true;
		fireme.classList.remove("hide");
		fireme.xpos = (myShip.offsetLeft + (myShip.offsetWidth/2));
		fireme.ypos = myShip.offsetTop - 10;
		fireme.style.left = fireme.xpos + "px";
		fireme.style.top = fireme.ypos + "px";

	}

	function update(){

		let tempAliens = document.querySelectorAll(".aliens");
			for(let x = tempAliens.length-1 ; x>-1 ; x-- ) {
				let el = tempAliens[x];
				if(el.xpos > (containerDim.width - el.offsetWidth) || 
					el.xpos < containerDim.left){
					el.directionMove *= -1;
					el.ypos += 40;

				}

				el.xpos = (player.alienSpeed * el.directionMove);
				el.style.left = el.xpos + "px";
				el.style.top = el.ypos + "px";
			
			}

		let tempPos = myShip.offsetLeft;

		if(player.fire){
			if(fireme.ypos>0){
				fireme.ypos-= 15;
				fireme.style.top = frame.ypos + "px";}
			else{
				player.fire = false;
				fireme.classList.add("hide");
				fireme.ypos = containerDim.height + 100;
			}

		}

		if(keyV.left && tempPos > containerDim.left){tempPos-= player.speed;}
		if(keyV.right && (tempPos + myShip.offsetWidth) < containerDim.right){tempPos+= player.speed;}
		myShip.style.left = tempPos + "px";
		player.animFrame = requestAnimationFrame(update)
	}

}