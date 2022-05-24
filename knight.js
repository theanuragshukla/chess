
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
		if ((ydiff == 2 && xdiff == 1) || (ydiff == 1 && xdiff == 2)) {
			this.prevx = this.alpha;
			this.prevy = this.num;
			this.alpha = newx;
			this.num = newy;
		} else {
			return false;
		} 		return true;
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
