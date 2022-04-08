var color1 = "dark";
var color2 = "light";
var letters = "abcdefgh";
var select = false;
var row = 0;
var tomove = 'w';
var prevDiv = null;
var prev = {
	x: '',
	y: '',
	name: '',
};
var current = {
	x: '',
	y: '',
	name: '',
}
var pieces = {};
window.onload = function() {
	// adding blocks
	for (var p = 0; p < 64; p++) {
		var color;
		if (Math.floor(p / 8) != row) {
			colorswitch();
			row = Math.floor(p / 8);
		}
		color = (p % 2 == 0 ? color1 : color2);
		document.getElementById("board").innerHTML += block(p + 1, color);
	}
	// pawns
	for (var i = 1; i <= 8; i++) {
		pieces[`p${i}`] = new Pawn(i, 2, "w", i);
		pieces[`p${8+i}`] = new Pawn(i, 7, "b", 8 + i);
	}
	//kings
	pieces["k1"] = new King(5, 1, "w", 1);
	pieces["k2"] = new King(5, 8, "b", 2);
	// Queens
	pieces["q1"] = new Queen(4, 1, "w", 1);
	pieces["q2"] = new Queen(4, 8, "b", 2);
	//knights
	pieces["n1"] = new Knight(2, 1, "w", 1);
	pieces["n2"] = new Knight(7, 1, "w", 2);
	pieces["n3"] = new Knight(2, 8, "b", 3);
	pieces["n4"] = new Knight(7, 8, "b", 4);
	// bishops
	pieces["b1"] = new Bishop(3, 1, "w", 1);
	pieces["b2"] = new Bishop(6, 1, "w", 2);
	pieces["b3"] = new Bishop(3, 8, "b", 3);
	pieces["b4"] = new Bishop(6, 8, "b", 4);
	// rooks
	pieces["r1"] = new Rook(1, 1, "w", 1);
	pieces["r2"] = new Rook(8, 1, "w", 2);
	pieces["r3"] = new Rook(1, 8, "b", 3);
	pieces["r4"] = new Rook(8, 8, "b", 4);
}

function validpath(x1, y1, x2, y2, diagonal) {
	if (x1 > 8 || x2 > 8 || y1 > 8 || y2 > 8 || x1 < 1 || x2 < 1 || y1 < 1 || y2 < 1) {
		return false;
	}
	const ydiff = y2 - y1;
	const xdiff = x2 - x1;
	if (diagonal) {
		if (ydiff == 0 || xdiff == 0 || abs(ydiff) !== abs(xdiff)) {
			return false;
		} else {
			const addtoy = (y2 > y1 ? 1 : -1);
			const addtox = (x2 > x1 ? 1 : -1);
			for (var i = 1; i < abs(ydiff); i++) {
				var block = document.querySelector(`[data-rank='${(abs(y1))+(i*addtoy)}'][data-file='${abs(x1)+(i*addtox)}']`);
				if (block.innerHTML == '') {} else {
					return false
				}
			}
			return true;
		}
	} else {
		var initial = (ydiff == 0 ? x1 : y1);
		const other = (ydiff == 0 ? y1 : x1);
		const final = (ydiff == 0 ? x2 : y2);
		const toAdd = (final > initial ? 1 : -1);
		const toAddy = (ydiff == 0 ? 0 : toAdd);
		const toAddx = (ydiff == 0 ? toAdd : 0);
		const rank = (ydiff == 0 ? other : initial);
		const file = (ydiff == 0 ? initial : other);
		for (var i = 1; i < abs(final - initial); i++) {
			const blockInPath = document.querySelector(`[data-rank='${abs(rank)+(i*toAddy)}'][data-file='${abs(file)+(i*toAddx)}']`);
			if (blockInPath.innerHTML != '') {
				return false;
			}
		}
		return true;
	}
}

function loc(e) {
	const blockName = `${e.getAttribute('data-file')}${e.getAttribute('data-rank')}`;
	const data = {
		x: e.getAttribute('data-file'),
		y: e.getAttribute('data-rank'),
		name: name(e),
		color: window.getComputedStyle(e).getPropertyValue("background-color"),
	};
	if (!select) {
		if (e.innerHTML != '') {
			if (pieces[name(e)].color != tomove) {
				return;
			}
			select = true;
			prev = data;
			prevDiv = e;
			e.classList.add('active');
			showLegelMoves(name(e), true);
		}
	} else {
		if (prevDiv != null) {
			prevDiv.classList.remove('active');
			showLegelMoves(name(prevDiv), false);
			prevDiv = null;
		}
		if (prev.name != data.name) {
			select = false;
			current = data;
			const obj = pieces[prev.name];
			obj.align(obj.move(e, data.y, data.x)) ? switchmove() : null;
		} else {
			select = false;
		}
	}
}
const showLegelMoves = async (piece, show) => {
	if (piece != null) {
		const validSquares = await pieces[piece].canGo();
		for (const square of validSquares) {
			if (square.x <= 8 && square.y <= 8 && square.x > 0 && square.y > 0) {
				const block = document.querySelector(`[data-rank='${square.y}'][data-file='${square.x}']`);
				const sameColor = (block.innerHTML != '' ? (pieces[name(block)].color == pieces[piece].color) : false);
				if (!sameColor) {
					if (show) {
						block.classList.add('highlight');
					}
				}
				if (!show) {
					block.classList.remove('highlight');
				}
			}
		}
	}
}
//utils
var block = function(i, color) {
	return `<div class ="block ${color} " id=block${i} onclick ="loc(this)" data-rank=${Math.floor((i-1)/8+1)} data-file=${Math.floor((i-1)%8+1)}></div>`
}

function colorswitch() {
	var buffer = color1;
	color1 = color2;
	color2 = buffer;
}

function switchmove() {
	tomove = (tomove == "w" ? "b" : "w");
}
const getBlock = (file, rank) => {
	const block = document.querySelector(`[data-rank='${rank}'][data-file='${file}']`);
	return block;
}
const isEmpty = (file, rank) => {
	return (getBlock(file, rank).innerHTML == '');
}

function getblock(i) {
	elem = document.getElementById("block" + i);
	return elem;
}
const name = (e) => {
	if (e.innerHTML != '') {
		return `${e.firstChild.getAttribute('data-name')}`
	}
	return null;
}
const abs = (number) => {
	return Math.abs(number);
}