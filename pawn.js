
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
