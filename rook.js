
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
			}
		
			return true;
		}
	move =async (e, newy, newx) => {
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
		}return true;
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
