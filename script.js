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

let a, r, l, p;

const
	pivot = ({x: x0, y: y0}, {x: x1, y: y2}, r) => ({
		x: x0+Math.cos(r)*(x1-x0)-Math.sin(r)*(y2-y0),
		y: y0+Math.sin(r)*(x1-x0)+Math.cos(r)*(y2-y0)
	}),
	update = _ => {
		ctx.clearRect(0, 0, w, h);
		if(req.value){
			ctx.fillStyle = p;
			ctx.fillRect(0, 0, w, h);
			ctx.fillStyle = `#${l>50? "000": "fff"}8`;
			ctx.textAlign = "center";
			ctx.font = "bold 24px Arial";
			ctx.save();
			ctx.translate(v[4].x, v[4].y);
			ctx.rotate(r);
			if(a < 1) a += 0.005;
			else a = 0;
			["x", "y"].forEach(e => v[2][e] = v[1][e]+a*v[0][e]*v[3][e]);
			/* pivot(v[2], {x: w, y: h}, r); */
			for(let i = 0; i < 15; i++) for(let j = 0; j < 15; j++) ctx.fillText(req.value, v[2].x+i*w/5, v[2].y+j*h/5);
			ctx.restore();
		}else{
			l = Math.random()*100;
			p = `hsl(${Math.random()*360}, ${Math.random()*100}%, ${l}%)`;
			r = Math.random()*Math.PI/2-Math.PI/4;
			v[1] = {
				x: Math.random()*v[0].x-w,
				y: Math.random()*v[0].y-h
			}
			v[2] = {x: 0, y: 0};
			v[3] = {
				x: Math.round(Math.random())? 1: -1,
				y: Math.round(Math.random())? 1: -1
			}
			v[4] = pivot({x: w/2, y: h/2}, {x: w/2, y: h/2}, r);
		}
	},
	loop = _ => {
		update();
		requestAnimationFrame(loop);
	};

console.log();
loop();