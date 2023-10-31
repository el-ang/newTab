const
    req = document.getElementById("req"),
	c = document.getElementById("c"),
    ctx = c.getContext("2d"),
	img = new Image(),
    bg = {
        0: "./asset/bg/0.jpg",
    },
	[w, h] = [c.width = 1920, c.height = 1080],
	v = [{x: w/5, y: h/5}];

let a, r, n = 0;

const
	update = _ => {
		/* pivot canvas rotation to the middle and track it by placing dot in quarter size of the canvas */
		r = Math.PI/360;
		n += r;
		v[3] = {
			x: w/2+Math.cos(n)*w/-2-Math.sin(n)*h/-2,
			y: h/2+Math.sin(n)*w/-2+Math.cos(n)*h/-2
		}
		ctx.save();
		ctx.translate(v[3].x, v[3].y);
		ctx.rotate(n);
		ctx.beginPath();
		ctx.arc(0, 0, 5, 0, Math.PI*2);
		ctx.arc(w/8, h/8, 5, 0, Math.PI*2);
		ctx.fillStyle = "#000";
		ctx.fill();
		ctx.translate(-v[3].x, -v[3].y);
		ctx.restore();
	},
	loop = _ => {
		update();
		requestAnimationFrame(loop);
	};

console.log();
loop();