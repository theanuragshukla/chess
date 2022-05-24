
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
	move =async (e, newy, newx) => {
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
		}  		return true;
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
