
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
	move = async (e, newy, newx) => {
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
		} 		return true;
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
