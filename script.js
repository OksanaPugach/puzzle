'use strict';


document.body.insertAdjacentHTML("afterbegin",`<div class="field"></div>`);

const field= document.querySelector(".field");

const cellSize=100;

const empty={
	value:"",
	top:3,
	left:3
}

const cells = [];
cells.push(empty);

let numbers=[];

function move(index){

		const cell = cells[index];

		const leftDiff = Math.abs(empty.left - cell.left);
		const topDiff = Math.abs(empty.top - cell.top);

		if(leftDiff + topDiff >1){
			return;
		}

		cell.element.style.left =`${empty.left*cellSize}px`;
		cell.element.style.top = `${empty.top*cellSize}px`;

		const emptyLeft = empty.left;
		const emptyTop = empty.top;

		empty.left = cell.left;
		empty.top = cell.top;

		cell.left = emptyLeft;
		cell.top = emptyTop;

}

function generate_numbers (){
		return [...Array(15).keys()].map(x=>x +1).sort(()=>Math.random() - 0.5);	
}

function find_solvable_combo (){
		  let arr= generate_numbers();
		  let sum=4;
		  let result = [];
		  for(let i=0; i<=arr.length; i++){
		    for(let j=i; j<=arr.length; j++){
		      if(arr[i]>arr[j]){
		        sum=sum+1;
		        console.log("arr[i]:"+ arr[i]+ "arr[j]:"+ arr[j]+"sum:"+sum)
		      }
		    }
		  }
		  console.log("final result  = " + sum);
		  if(sum%2 == 0){
		  	return result = arr;
		  }else{
		  	find_solvable_combo();
		  }
}

numbers = find_solvable_combo();
//const numbers = [...Array(15).keys()].map(x=>x +1).sort(()=>Math.random() - 0.5)

for(let i = 1; i <= 15; i++){
	const cell = document.createElement("div");
	const value = numbers[i-1];
	cell.className="cell";
	cell.innerHTML=numbers[i-1];
	let left = 0;
	let top = 0;


	if(i>1){
		
		left= i%4 -1;
		top = (i - i%4) / 4;

		if (i%4 == 0){
			 left = 3;
			 top = ((i - i%4) / 4)-1;
		}

	}

	cells.push({
		value:value,
		left:left,
		top:top,
		element:cell
	});

		cell.style.left = `${left*cellSize}px`;
		cell.style.top = `${top*cellSize}px`;

	field.append(cell);

	cell.addEventListener('click', () =>{
		move(i);
	});

}
