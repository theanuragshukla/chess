var color1 = "dark";
var color2="light";
var letters="abcdefgh";
var select=false;
var row=0;
var tomove='w';
var prevDiv=null;
var prev={
	x:'',
	y:'',
	name:'',
};
var current = {
	x:'',
	y:'',
	name:'',
}
var pieces = {};


var block = function(i, color){	
	return `<div class ="block ${color} " id=block${i} onclick ="loc(this)" data-rank=${Math.floor((i-1)/8+1)} data-file=${Math.floor((i-1)%8+1)}></div>`
}
function colorswitch(){	
	var buffer=color1;
	color1 = color2;
	color2=buffer;
}

function switchmove (){
	tomove=(tomove=="w"?"b":"w");
}

function getblock(i){
	elem=document.getElementById("block"+i);
	return elem;
}

window.onload =function () {
	
	// adding blocks

	for (var p=0;p<64;p++){
		var color;
		if(Math.floor(p/8)!= row){
			colorswitch();
			row=Math.floor(p/8);
		}	
		color = (p%2==0 ? color1 : color2);
		document.getElementById("board"). innerHTML += block(p+1, color);
	}

	// pawns
	for(var i=1;i<=8;i++){
		pieces[`p${i}`] = new Pawn(i,2,"w",i);
		pieces[`p${8+i}`] = new Pawn(i,7,"b",8+i);
	}

	//kings
	pieces["k1"]=new King(5,1,"w",1);
	pieces["k2"]=new King(5,8,"b",2);

	// Queens
	pieces["q1"]=new Queen(4,1,"w",1);
	pieces["q2"]=new Queen(4,8,"b",2);

	//knights

	pieces["n1"]=new Knight(2,1,"w",1);
	pieces["n2"]=new Knight(7,1,"w",2);
	pieces["n3"]=new Knight(2,8,"b",3);
	pieces["n4"]=new Knight(7,8,"b",4);

	// bishops

	pieces["b1"]=new Bishop(3,1,"w",1);
	pieces["b2"]=new Bishop(6,1,"w",2);
	pieces["b3"]=new Bishop(3,8,"b",3);
	pieces["b4"]=new Bishop(6,8,"b",4);

	// rooks

	pieces["r1"]=new Rook(1,1,"w",1);
	pieces["r2"]=new Rook(8,1,"w",2);
	pieces["r3"]=new Rook(1,8,"b",3);
	pieces["r4"]=new Rook(8,8,"b",4);


}


const name = (e) => { 
	if(e.innerHTML!=''){
		return `${e.firstChild.getAttribute('data-name')}`
	}
	return null;
};


function validpath(x1,y1,x2,y2,diagonal){
	if(x1>8||x2>8||y1>8||y2>8||x1<1||x2<1||y1<1||y2<1){
		return false;
	}
	const ydiff = y2-y1;
	const xdiff = x2-x1;
	if(diagonal){
		if(ydiff==0 || xdiff==0 || Math.abs(ydiff)!==Math.abs(xdiff)){
			return false;
		}else{ 
			const addtoy=(y2>y1 ? 1 : -1);
			const addtox=(x2>x1 ? 1 : -1);

			for(var i =1;i<Math.abs(ydiff);i++){
				var block = document.querySelector(`[data-rank='${(Math.abs(y1))+(i*addtoy)}'][data-file='${Math.abs(x1)+(i*addtox)}']`);
				if(block.innerHTML==''){
				}else{
					return false
				}
			}
			return true;
		}
	}else{
		var initial =(ydiff==0 ? x1 : y1);
		const other = (ydiff==0 ? y1 : x1);
		const final = (ydiff==0 ? x2 : y2);
		const toAdd = (final>initial ? 1 : -1);
		const toAddy = (ydiff==0 ? 0 : toAdd);
		const toAddx = (ydiff==0 ? toAdd : 0);
		const rank =( ydiff==0?other:initial);
		const file = (ydiff==0?initial:other);
		for(var i=1;i<Math.abs(final-initial);i++){
			const blockInPath= document.querySelector(`[data-rank='${Math.abs(rank)+(i*toAddy)}'][data-file='${Math.abs(file)+(i*toAddx)}']`);
			if(blockInPath.innerHTML!=''){
				return false;
			}
		}
		return true;
	}
}

function loc(e){
	const blockName=`${e.getAttribute('data-file')}${e.getAttribute('data-rank')}`;
	const data = {
		x:e.getAttribute('data-file'),
		y:e.getAttribute('data-rank'),
		name:name(e),
		color:window.getComputedStyle(e).getPropertyValue("background-color"),
	};

	if(!select){
		if(e.innerHTML!=''){
			if(pieces[name(e)].color!=tomove){
				return;
			}
			select=true;
			prev=data;
			prevDiv=e;
			e.classList.add('active');
			showLegelMoves(name(e),true);
		}
	}else{
		if(prevDiv!=null){
			prevDiv.classList.remove('active');
			showLegelMoves(name(prevDiv),false);
			prevDiv=null;

		}

		if(prev.name!=data.name){
			select=false;
			current=data;
			const obj = pieces[prev.name];
			obj.align(obj.move(e,data.y,data.x)) ?switchmove() :null ;
		}else{
			select=false;
		}

	}

}


class Queen{
	constructor(x,y,clr,id){
		this.alpha=x;
		this.num=y;
		this.name="q"+id;
		this.notMoved=true;
		this.color=clr;
		this.img=`<img src='./pieces/${this.color}queen.svg' data-name=q${id}>`;
		this.align(true);	
	}


	align=(valid)=>{
		if(valid){
			var block = document.querySelector(`[data-rank='${this.num}'][data-file='${this.alpha}']`);
			var prevBlock = document.querySelector(`[data-rank='${this.prevy}'][data-file='${this.prevx}']`);
			block.innerHTML=this.img;
			prevBlock!=null ? prevBlock.innerHTML='':null;
			return true;
		}
	}


	move=(e,newy,newx)=>{
		if(tomove!=this.color){
			return false;
		}
		if(e.innerHTML!=''){
			if(pieces[name(e)].color==this.color){
				return false;
			}
		}
		const ydiff=Math.abs(newy-this.num);
		const xdiff=Math.abs(newx-this.alpha);

		if((xdiff==ydiff || xdiff==0 || ydiff==0) && (validpath(this.alpha,this.num,newx,newy,false)||validpath(this.alpha,this.num,newx,newy,true))){
			this.prevx=this.alpha;
			this.prevy=this.num;
			this.alpha=newx;
			this.num=newy;
		}else{
			return false;
		}
		return true;


	}
	canGo = () => {
		var squares=[];
		const rows=[];
		const col=[];


		for(var i=1;i<9;i++){
			if(validpath(this.alpha,this.num,abs(this.alpha)+i,abs(this.num)+i,true)){
				squares.push({x:abs(this.alpha)+i,y:abs(this.num)+i});
			}

			if(validpath(this.alpha,this.num,abs(this.alpha)-i,abs(this.num)-i,true)){
				squares.push({x:abs(this.alpha)-i,y:abs(this.num)-i});
			}

			if(validpath(this.alpha,this.num,abs(this.alpha)-i,abs(this.num)+i,true)){
				squares.push({x:abs(this.alpha)-i,y:abs(this.num)+i});
			}

			if(validpath(this.alpha,this.num,abs(this.alpha)+i,abs(this.num)-i,true)){
				squares.push({x:abs(this.alpha)+i,y:abs(this.num)-i});
			}
		if(validpath(this.alpha,i,this.alpha,this.num,false)){
				col.push({x:this.alpha,y:i});
			}
			if(validpath(i,this.num,this.alpha,this.num,false)){
				rows.push({x:i,y:this.num});
			}
		

		}


		return [...squares,...rows,...col];
	}
}





class Bishop{
	constructor(x,y,clr,id){
		this.alpha=x;
		this.num=y;
		this.name="b"+id;
		this.notMoved=true;
		this.color=clr;
		this.img=`<img src='./pieces/${this.color}bishop.svg' data-name=b${id}>`;
		this.align(true);	
	}


	align=(valid)=>{
		if(valid){
			var block = document.querySelector(`[data-rank='${this.num}'][data-file='${this.alpha}']`);
			var prevBlock = document.querySelector(`[data-rank='${this.prevy}'][data-file='${this.prevx}']`);
			block.innerHTML=this.img;
			prevBlock!=null ? prevBlock.innerHTML='':null;
			return true;
		}
	}


	move=(e,newy,newx)=>{
		if(tomove!=this.color){
			return false;
		}
		if(e.innerHTML!=''){
			if(pieces[name(e)].color==this.color){
				return false;
			}
		}
		const ydiff=Math.abs(newy-this.num);
		const xdiff=Math.abs(newx-this.alpha);


		if(xdiff==ydiff && validpath(this.alpha,this.num,newx,newy,true)){
			this.prevx=this.alpha;
			this.prevy=this.num;
			this.alpha=newx;
			this.num=newy;
		}else{
			return false;
		}
		return true;


	}
	canGo=()=>{
		var squares=[];

		for(var i=1;i<9;i++){
			if(validpath(this.alpha,this.num,abs(this.alpha)+i,abs(this.num)+i,true)){
				squares.push({x:abs(this.alpha)+i,y:abs(this.num)+i});
			}

			if(validpath(this.alpha,this.num,abs(this.alpha)-i,abs(this.num)-i,true)){
				squares.push({x:abs(this.alpha)-i,y:abs(this.num)-i});
			}

			if(validpath(this.alpha,this.num,abs(this.alpha)-i,abs(this.num)+i,true)){
				squares.push({x:abs(this.alpha)-i,y:abs(this.num)+i});
			}

			if(validpath(this.alpha,this.num,abs(this.alpha)+i,abs(this.num)-i,true)){
				squares.push({x:abs(this.alpha)+i,y:abs(this.num)-i});
			}


		}

		return squares;
	}
}


const abs = (number) => {
	return Math.abs(number);
}

class Rook{
	constructor(x,y,clr,id){
		this.alpha=x;
		this.num=y;
		this.name="r"+id;
		this.notMoved=true;
		this.color=clr;
		this.img=`<img src='./pieces/${this.color}rook.svg' data-name=r${id}>`;
		this.align(true);	
	}


	align=(valid)=>{
		if(valid){
			var block = document.querySelector(`[data-rank='${this.num}'][data-file='${this.alpha}']`);
			var prevBlock = document.querySelector(`[data-rank='${this.prevy}'][data-file='${this.prevx}']`);
			block.innerHTML=this.img;
			prevBlock!=null ? prevBlock.innerHTML='':null;
			return true;
		}
	}


	move=(e,newy,newx)=>{
		if(tomove!=this.color){
			return false;
		}
		if(e.innerHTML!=''){
			if(pieces[name(e)].color==this.color){
				return false;
			}
		}
		const ydiff=Math.abs(newy-this.num);
		const xdiff=Math.abs(newx-this.alpha);
		if((ydiff==0 || xdiff==0) && validpath(this.alpha,this.num,newx,newy,false)){
			this.prevx=this.alpha;
			this.prevy=this.num;
			this.alpha=newx;
			this.num=newy;
		}else{
			return false;
		}
		return true;
	}

	canGo=()=>{
		var squares=[];
		var rows=[];
		var col=[];
		for(var i=1;i<9;i++){
			if(validpath(this.alpha,i,this.alpha,this.num,false)){
				col.push({x:this.alpha,y:i});
			}
			if(validpath(i,this.num,this.alpha,this.num,false)){
				rows.push({x:i,y:this.num});
			}
		}	
		squares=[...rows,...col];
		return squares;
	}

}




class Knight{
	constructor(x,y,clr,id){
		this.alpha=x;
		this.num=y;
		this.name="n"+id;
		this.notMoved=true;
		this.color=clr;
		this.img=`<img src='./pieces/${this.color}knight.svg' data-name=n${id}>`;
		this.align(true);	
	}


	align=(valid)=>{
		if(valid){
			var block = document.querySelector(`[data-rank='${this.num}'][data-file='${this.alpha}']`);
			var prevBlock = document.querySelector(`[data-rank='${this.prevy}'][data-file='${this.prevx}']`);
			block.innerHTML=this.img;
			prevBlock!=null ? prevBlock.innerHTML='':null;
			return true;
		}
	}


	move=(e,newy,newx)=>{
		if(tomove!=this.color){
			return false;
		}
		if(e.innerHTML!=''){
			if(pieces[name(e)].color==this.color){
				return false;
			}
		}
		const ydiff=Math.abs(newy-this.num);
		const xdiff=Math.abs(newx-this.alpha);
		if((ydiff==2 && xdiff==1)||(ydiff==1 && xdiff==2)){
			this.prevx=this.alpha;
			this.prevy=this.num;
			this.alpha=newx;
			this.num=newy;
		}else{
			return false;
		}
		return true;

	}
	canGo=()=>{
		const squares=[];
		const vals=[{x:1,y:2},{x:-1,y:2},{x:1,y:-2},{x:-1,y:-2},{x:2,y:1},{x:2,y:-1},{x:-2,y:1},{x:-2,y:-1}];
		for (const val of vals){
			const xCoord = Math.abs(this.alpha) +(val.x>0? Math.abs(val.x):-1*Math.abs(val.x));
			const yCoord = Math.abs(this.num) + (val.y>0?Math.abs(val.y):-1*Math.abs(val.y));
			if(xCoord<=8 && yCoord<=8 && xCoord>0 && yCoord>0){
				squares.push({x:xCoord,y:yCoord});
			}
			}
		console.log(squares);
		return squares;
	
	}

}



class King{
	constructor(x,y,clr,id){
		this.alpha=x;
		this.num=y;
		this.name="p"+id;
		this.notMoved=true;
		this.color=clr;
		this.img=`<img src='./pieces/${this.color}king.svg' data-name=k${id}>`;
		this.align(true);	
	}


	align=(valid)=>{
		if(valid){
			var block = document.querySelector(`[data-rank='${this.num}'][data-file='${this.alpha}']`);
			var prevBlock = document.querySelector(`[data-rank='${this.prevy}'][data-file='${this.prevx}']`);
			block.innerHTML=this.img;
			prevBlock!=null ? prevBlock.innerHTML='':null;
			return true;
		}
	}


	move=(e,newy,newx)=>{
		if(tomove!=this.color){
			return false;
		}
		const data = {
			alpha:this.alpha,
			num:this.num
		};
		if(e.innerHTML!=''){
			if(pieces[name(e)].color==this.color){
				return false;
			}
		}

		if(Math.abs(newx-this.alpha)<=1 && Math.abs(newy-this.num)<=1){
			this.prevx=this.alpha;
			this.prevy=this.num;
			this.alpha=newx;
			this.num=newy;
		}else{
			return false;
		}
		return true;

	}

	canGo=()=>{
		const vals = [{x:0,y:1},{x:1,y:1},{x:1,y:0},{x:1,y:-1},{x:0,y:-1},{x:-1,y:-1},{x:-1,y:0},{x:-1,y:1}];
		const squares = [];
		for (const val of vals){
			const xCoord = Math.abs(this.alpha) +(val.x>0? Math.abs(val.x):-1*Math.abs(val.x));
			const yCoord = Math.abs(this.num) + (val.y>0?Math.abs(val.y):-1*Math.abs(val.y));
			if(xCoord<=8 && yCoord<=8 && xCoord>0 && yCoord>0){
				squares.push({x:xCoord,y:yCoord});
			}
			}
		console.log(squares);
		return squares;
	}

}


class Pawn {
	constructor(x,y,clr,id){
		this.alpha=x;
		this.num=y;
		this.name="p"+id;
		this.notMoved=true;
		this.color=clr;
		this.black=(clr=="b")
		this.img=`<img src='./pieces/${this.color}pawn.svg' data-name=p${id}>`;
		this.align(true);	
	}

	move = (e,newy,newx) => {		
		if(tomove!=this.color){
			return false;
		}
		const data = {
			alpha:this.alpha,
			num:this.num
		};
		if(e.innerHTML!=''){
			if(pieces[name(e)].color==this.color){
				return false;
			}
		}
		if(newx==this.alpha+1 || newx == this.alpha-1){
			if(e.innerHTML==''){
				return false;
			}else{
				data.alpha=newx;
			}
		}

		if(newy-this.num== (!this.black ? 1 : -1)){
			if(e.innerHTML==''){
				data.num+=(this.black ? -1 : 1);
				this.notMoved=false;

			}else{
				if(data.alpha!=this.alpha){
					data.num+=(this.black ? -1 : 1);
					this.notMoved=false;

				}else{
					return false;
				}
			}
		}else if(newy - this.num==(!this.black ? 2 : -2) && this.notMoved){
			if(e.innerHTML=='' && document.querySelector(`[data-rank='${this.num+(this.black?-1:1)}'][data-file='${this.alpha}']`).innerHTML==''){
				this.notMoved=false;
				data.num+=(this.black ? -2 : 2);

			}else{
				return false;
			}
		}else{
			return false;
		}
		this.prevx=this.alpha;
		this.prevy=this.num;
		this.alpha=data.alpha;
		this.num=data.num;
		return true;
	}



	align=(valid)=>{
		if(valid){
			var block = document.querySelector(`[data-rank='${this.num}'][data-file='${this.alpha}']`);
			var prevBlock = document.querySelector(`[data-rank='${this.prevy}'][data-file='${this.prevx}']`);
			block.innerHTML=this.img;
			prevBlock!=null ? prevBlock.innerHTML='':null;
			return true;
		}
	}

	canGo=()=>{
		const squares = [];
		const yCoord = this.num+(this.black?-1:+1);
		try{	
			!isEmpty(Math.abs(this.alpha)+1,yCoord)?squares.push({x:this.alpha+1,y:yCoord}):null;
			!isEmpty(Math.abs(this.alpha)-1,yCoord)?squares.push({x:this.alpha-1,y:yCoord}):null;}
		catch(e){
			}
		isEmpty(this.alpha,yCoord)?squares.push({x:this.alpha,y:yCoord}):null;
	(	this.notMoved && isEmpty(this.alpha,yCoord) && isEmpty(this.alpha,Math.abs(yCoord)+(this.black ? -1 : 1))) ? squares.push({x:this.alpha,y:(this.black ? yCoord-1 : yCoord+1)}):null;
		return squares;
	}

}

showLegelMoves=async (piece,show)=>{
	console.log(piece);
	if(piece!=null){
		const validSquares =await pieces[piece].canGo();
		console.log(validSquares);
		for (const square of validSquares){
			if(square.x<=8 && square.y<=8 && square.x>0 && square.y>0){
				const block = document.querySelector(`[data-rank='${square.y}'][data-file='${square.x}']`);
			const sameColor =(block.innerHTML!=''?(pieces[name(block)].color==pieces[piece].color):false);
			if(!sameColor){
				if(show){
				console.log(block);
					block.classList.add('highlight');
				}}
				if(!show){
					block.classList.remove('highlight');
				}

			}
		}
	}
}

const getBlock=(file,rank)=>{
	const block = document.querySelector(`[data-rank='${rank}'][data-file='${file}']`);
	return block;
}

const isEmpty = (file,rank)=>{
	return (getBlock(file,rank).innerHTML=='');
}
