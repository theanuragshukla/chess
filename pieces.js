class Queen {
	constructor(x, y, clr, id) {
		this.alpha = x;
		this.num = y;
		this.name = "q" + id;
		this.notMoved = true;
		this.color = clr;
		this.img = `<img src='./pieces/${this.color}queen.svg' data-name=q${id}>`;
		this.align(true);
	}
	align = (valid) => {
		if (valid) {
			var block = document.querySelector(`[data-rank='${this.num}'][data-file='${this.alpha}']`);
			var prevBlock = document.querySelector(`[data-rank='${this.prevy}'][data-file='${this.prevx}']`);
			block.innerHTML = this.img;
			prevBlock != null ? prevBlock.innerHTML = '' : null;
			return true;
		}
	}
	move = (e, newy, newx) => {
		if (tomove != this.color) {
			return false;
		}
		if (e.innerHTML != '') {
			if (pieces[name(e)].color == this.color) {
				return false;
			}
		}
		const ydiff = abs(newy - this.num);
		const xdiff = abs(newx - this.alpha);
		if ((xdiff == ydiff || xdiff == 0 || ydiff == 0) && (validpath(this.alpha, this.num, newx, newy, false) || validpath(this.alpha, this.num, newx, newy, true))) {
			this.prevx = this.alpha;
			this.prevy = this.num;
			this.alpha = newx;
			this.num = newy;
		} else {
			return false;
		}
		return true;
	}
	canGo = () => {
		var squares = [];
		const rows = [];
		const col = [];
		for (var i = 1; i < 9; i++) {
			if (validpath(this.alpha, this.num, abs(this.alpha) + i, abs(this.num) + i, true)) {
				squares.push({
					x: abs(this.alpha) + i,
					y: abs(this.num) + i
				});
			}
			if (validpath(this.alpha, this.num, abs(this.alpha) - i, abs(this.num) - i, true)) {
				squares.push({
					x: abs(this.alpha) - i,
					y: abs(this.num) - i
				});
			}
			if (validpath(this.alpha, this.num, abs(this.alpha) - i, abs(this.num) + i, true)) {
				squares.push({
					x: abs(this.alpha) - i,
					y: abs(this.num) + i
				});
			}
			if (validpath(this.alpha, this.num, abs(this.alpha) + i, abs(this.num) - i, true)) {
				squares.push({
					x: abs(this.alpha) + i,
					y: abs(this.num) - i
				});
			}
			if (validpath(this.alpha, i, this.alpha, this.num, false)) {
				col.push({
					x: this.alpha,
					y: i
				});
			}
			if (validpath(i, this.num, this.alpha, this.num, false)) {
				rows.push({
					x: i,
					y: this.num
				});
			}
		}
		return [...squares, ...rows, ...col];
	}
}
class Bishop {
	constructor(x, y, clr, id) {
		this.alpha = x;
		this.num = y;
		this.name = "b" + id;
		this.notMoved = true;
		this.color = clr;
		this.img = `<img src='./pieces/${this.color}bishop.svg' data-name=b${id}>`;
		this.align(true);
	}
	align = (valid) => {
		if (valid) {
			var block = document.querySelector(`[data-rank='${this.num}'][data-file='${this.alpha}']`);
			var prevBlock = document.querySelector(`[data-rank='${this.prevy}'][data-file='${this.prevx}']`);
			block.innerHTML = this.img;
			prevBlock != null ? prevBlock.innerHTML = '' : null;
			return true;
		}
	}
	move = (e, newy, newx) => {
		if (tomove != this.color) {
			return false;
		}
		if (e.innerHTML != '') {
			if (pieces[name(e)].color == this.color) {
				return false;
			}
		}
		const ydiff = abs(newy - this.num);
		const xdiff = abs(newx - this.alpha);
		if (xdiff == ydiff && validpath(this.alpha, this.num, newx, newy, true)) {
			this.prevx = this.alpha;
			this.prevy = this.num;
			this.alpha = newx;
			this.num = newy;
		} else {
			return false;
		}
		return true;
	}
	canGo = () => {
		var squares = [];
		for (var i = 1; i < 9; i++) {
			if (validpath(this.alpha, this.num, abs(this.alpha) + i, abs(this.num) + i, true)) {
				squares.push({
					x: abs(this.alpha) + i,
					y: abs(this.num) + i
				});
			}
			if (validpath(this.alpha, this.num, abs(this.alpha) - i, abs(this.num) - i, true)) {
				squares.push({
					x: abs(this.alpha) - i,
					y: abs(this.num) - i
				});
			}
			if (validpath(this.alpha, this.num, abs(this.alpha) - i, abs(this.num) + i, true)) {
				squares.push({
					x: abs(this.alpha) - i,
					y: abs(this.num) + i
				});
			}
			if (validpath(this.alpha, this.num, abs(this.alpha) + i, abs(this.num) - i, true)) {
				squares.push({
					x: abs(this.alpha) + i,
					y: abs(this.num) - i
				});
			}
		}
		return squares;
	}
}
class Rook {
	constructor(x, y, clr, id) {
		this.alpha = x;
		this.num = y;
		this.name = "r" + id;
		this.notMoved = true;
		this.color = clr;
		this.img = `<img src='./pieces/${this.color}rook.svg' data-name=r${id}>`;
		this.align(true);
	}
	align = (valid) => {
		if (valid) {
			var block = document.querySelector(`[data-rank='${this.num}'][data-file='${this.alpha}']`);
			var prevBlock = document.querySelector(`[data-rank='${this.prevy}'][data-file='${this.prevx}']`);
			block.innerHTML = this.img;
			prevBlock != null ? prevBlock.innerHTML = '' : null;
			return true;
		}
	}
	move = (e, newy, newx) => {
		if (tomove != this.color) {
			return false;
		}
		if (e.innerHTML != '') {
			if (pieces[name(e)].color == this.color) {
				return false;
			}
		}
		const ydiff = abs(newy - this.num);
		const xdiff = abs(newx - this.alpha);
		if ((ydiff == 0 || xdiff == 0) && validpath(this.alpha, this.num, newx, newy, false)) {
			this.prevx = this.alpha;
			this.prevy = this.num;
			this.alpha = newx;
			this.num = newy;
		} else {
			return false;
		}
		return true;
	}
	canGo = () => {
		var squares = [];
		var rows = [];
		var col = [];
		for (var i = 1; i < 9; i++) {
			if (validpath(this.alpha, i, this.alpha, this.num, false)) {
				col.push({
					x: this.alpha,
					y: i
				});
			}
			if (validpath(i, this.num, this.alpha, this.num, false)) {
				rows.push({
					x: i,
					y: this.num
				});
			}
		}
		squares = [...rows, ...col];
		return squares;
	}
}
class Knight {
	constructor(x, y, clr, id) {
		this.alpha = x;
		this.num = y;
		this.name = "n" + id;
		this.notMoved = true;
		this.color = clr;
		this.img = `<img src='./pieces/${this.color}knight.svg' data-name=n${id}>`;
		this.align(true);
	}
	align = (valid) => {
		if (valid) {
			var block = document.querySelector(`[data-rank='${this.num}'][data-file='${this.alpha}']`);
			var prevBlock = document.querySelector(`[data-rank='${this.prevy}'][data-file='${this.prevx}']`);
			block.innerHTML = this.img;
			prevBlock != null ? prevBlock.innerHTML = '' : null;
			return true;
		}
	}
	move = (e, newy, newx) => {
		if (tomove != this.color) {
			return false;
		}
		if (e.innerHTML != '') {
			if (pieces[name(e)].color == this.color) {
				return false;
			}
		}
		const ydiff = abs(newy - this.num);
		const xdiff = abs(newx - this.alpha);
		if ((ydiff == 2 && xdiff == 1) || (ydiff == 1 && xdiff == 2)) {
			this.prevx = this.alpha;
			this.prevy = this.num;
			this.alpha = newx;
			this.num = newy;
		} else {
			return false;
		}
		return true;
	}
	canGo = () => {
		const squares = [];
		const vals = [{
			x: 1,
			y: 2
		}, {
			x: -1,
			y: 2
		}, {
			x: 1,
			y: -2
		}, {
			x: -1,
			y: -2
		}, {
			x: 2,
			y: 1
		}, {
			x: 2,
			y: -1
		}, {
			x: -2,
			y: 1
		}, {
			x: -2,
			y: -1
		}];
		for (const val of vals) {
			const xCoord = abs(this.alpha) + (val.x > 0 ? abs(val.x) : -1 * abs(val.x));
			const yCoord = abs(this.num) + (val.y > 0 ? abs(val.y) : -1 * abs(val.y));
			if (xCoord <= 8 && yCoord <= 8 && xCoord > 0 && yCoord > 0) {
				squares.push({
					x: xCoord,
					y: yCoord
				});
			}
		}
		return squares;
	}
}
class King {
	constructor(x, y, clr, id) {
		this.alpha = x;
		this.num = y;
		this.name = "p" + id;
		this.notMoved = true;
		this.color = clr;
		this.img = `<img src='./pieces/${this.color}king.svg' data-name=k${id}>`;
		this.align(true);
	}
	align = (valid) => {
		if (valid) {
			var block = document.querySelector(`[data-rank='${this.num}'][data-file='${this.alpha}']`);
			var prevBlock = document.querySelector(`[data-rank='${this.prevy}'][data-file='${this.prevx}']`);
			block.innerHTML = this.img;
			prevBlock != null ? prevBlock.innerHTML = '' : null;
			return true;
		}
	}
	move = (e, newy, newx) => {
		if (tomove != this.color) {
			return false;
		}
		const data = {
			alpha: this.alpha,
			num: this.num
		};
		if (e.innerHTML != '') {
			if (pieces[name(e)].color == this.color) {
				return false;
			}
		}
		if (abs(newx - this.alpha) <= 1 && abs(newy - this.num) <= 1) {
			this.prevx = this.alpha;
			this.prevy = this.num;
			this.alpha = newx;
			this.num = newy;
		} else {
			return false;
		}
		return true;
	}
	canGo = () => {
		const vals = [{
			x: 0,
			y: 1
		}, {
			x: 1,
			y: 1
		}, {
			x: 1,
			y: 0
		}, {
			x: 1,
			y: -1
		}, {
			x: 0,
			y: -1
		}, {
			x: -1,
			y: -1
		}, {
			x: -1,
			y: 0
		}, {
			x: -1,
			y: 1
		}];
		const squares = [];
		for (const val of vals) {
			const xCoord = abs(this.alpha) + (val.x > 0 ? abs(val.x) : -1 * abs(val.x));
			const yCoord = abs(this.num) + (val.y > 0 ? abs(val.y) : -1 * abs(val.y));
			if (xCoord <= 8 && yCoord <= 8 && xCoord > 0 && yCoord > 0) {
				squares.push({
					x: xCoord,
					y: yCoord
				});
			}
		}
		return squares;
	}
}
class Pawn {
	constructor(x, y, clr, id) {
		this.alpha = x;
		this.num = y;
		this.name = "p" + id;
		this.notMoved = true;
		this.color = clr;
		this.black = (clr == "b")
		this.img = `<img src='./pieces/${this.color}pawn.svg' data-name=p${id}>`;
		this.align(true);
	}
	move = (e, newy, newx) => {
		if (tomove != this.color) {
			return false;
		}
		const data = {
			alpha: this.alpha,
			num: this.num
		};
		if (e.innerHTML != '') {
			if (pieces[name(e)].color == this.color) {
				return false;
			}
		}
		if (newx == this.alpha + 1 || newx == this.alpha - 1) {
			if (e.innerHTML == '') {
				return false;
			} else {
				data.alpha = newx;
			}
		}
		if (newy - this.num == (!this.black ? 1 : -1)) {
			if (e.innerHTML == '') {
				data.num += (this.black ? -1 : 1);
				this.notMoved = false;
			} else {
				if (data.alpha != this.alpha) {
					data.num += (this.black ? -1 : 1);
					this.notMoved = false;
				} else {
					return false;
				}
			}
		} else if (newy - this.num == (!this.black ? 2 : -2) && this.notMoved) {
			if (e.innerHTML == '' && document.querySelector(`[data-rank='${this.num+(this.black?-1: 1)}'][data-file='${this.alpha}']`).innerHTML == '') {
				this.notMoved = false;
				data.num += (this.black ? -2 : 2);
			} else {
				return false;
			}
		} else {
			return false;
		}
		this.prevx = this.alpha;
		this.prevy = this.num;
		this.alpha = data.alpha;
		this.num = data.num;
		return true;
	}
	align = (valid) => {
		if (valid) {
			var block = document.querySelector(`[data-rank='${this.num}'][data-file='${this.alpha}']`);
			var prevBlock = document.querySelector(`[data-rank='${this.prevy}'][data-file='${this.prevx}']`);
			block.innerHTML = this.img;
			prevBlock != null ? prevBlock.innerHTML = '' : null;
			return true;
		}
	}
	canGo = () => {
		const squares = [];
		const yCoord = this.num + (this.black ? -1 : +1);
		try {
			!isEmpty(abs(this.alpha) + 1, yCoord) ? squares.push({
				x: this.alpha + 1,
				y: yCoord
			}) : null;
			!isEmpty(abs(this.alpha) - 1, yCoord) ? squares.push({
				x: this.alpha - 1,
				y: yCoord
			}) : null;
		} catch (e) {}
		isEmpty(this.alpha, yCoord) ? squares.push({
			x: this.alpha,
			y: yCoord
		}) : null;
		(this.notMoved && isEmpty(this.alpha, yCoord) && isEmpty(this.alpha, abs(yCoord) + (this.black ? -1 : 1))) ? squares.push({
			x: this.alpha,
			y: (this.black ? yCoord - 1 : yCoord + 1)
		}): null;
		return squares;
	}
}