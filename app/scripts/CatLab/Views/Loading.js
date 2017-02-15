define(
    [],
    function () {
        return function CatLabLoadingScreen(canvas) {
            var ctx = canvas.getContext('2d');
            var img = new Image();
            var self = this;
            var step = 0;

            var pawsize = {
                'width': 20,
                'height': 20
            };

            var limits = {
                'x': {
                    'start': 0,
                    'end': canvas.width
                },
                'y': {
                    'start': 0,
                    'end': canvas.height
                }
            };

            var position = {
                'x': limits.x.end / 2,
                'y': limits.y.end / 2
            };

            var dx = Math.random();
            var dy = 1 - dx;

            var speed = 10;

            dx *= speed;
            dy *= speed;

            var points = [];
            var flipper = false;
            var stop = false;

            var percentage = 0;

            this.addPaw = function () {
                flipper = !flipper;

                var ox = 10;
                if (flipper) {
                    ox *= -1;
                }

                points.push({
                    'x': position.x,
                    'y': position.y,
                    'offsetx': ox,
                    'offsety': 0,
                    'opacity': 0.6,
                    'direction': Math.atan2(dy, dx) + (Math.PI / 2)
                });
            };

            this.draw = function () {

                position.x += dx;
                position.y += dy;

                if (position.x < limits.x.start) {
                    dx *= -1;
                }

                if (position.x > limits.x.end) {
                    dx *= -1;
                }

                if (position.y < limits.y.start) {
                    dy *= -1;
                }

                if (position.y > limits.y.end) {
                    dy *= -1;
                }

                if (step % 5 == 0) {
                    this.addPaw();
                }

                ctx.clearRect(0, 0, canvas.width, canvas.height);

                ctx.fillStyle = "#000000";
                ctx.fillRect(0, 0, canvas.width, canvas.height);

                ctx.fillStyle = "#ffffff";

                ctx.font = "15px monospace";
                ctx.fillText("Loading", (canvas.width / 2) - 25, canvas.height / 2);

                ctx.fillText(percentage + "%", (canvas.width / 2) - 5, (canvas.height / 2) + 20);

                for (var i = 0; i < points.length; i++) {
                    ctx.save();

                    ctx.globalAlpha = points[i].opacity;
                    ctx.translate(points[i].x, points[i].y);
                    ctx.translate(pawsize.width / 2, pawsize.height / 2);
                    ctx.rotate(points[i].direction);

                    ctx.drawImage
                    (
                        img,
                        0, 0,
                        img.width, img.height,
                        0 - (pawsize.width / 2) - points[i].offsetx, 0 - (pawsize.height / 2) - points[i].offsety,
                        pawsize.width, pawsize.height
                    );

                    ctx.translate(points[i].x, points[i].y);
                    ctx.restore();

                    points[i].opacity -= (1 / 60);
                }

                var tmppoints = [];
                for (i = 0; i < points.length; i++) {
                    if (points[i].opacity > 0) {
                        tmppoints.push(points[i]);
                    }
                }
                points = tmppoints;
            };

            this.stop = function () {
                stop = true;
            };

            this.next = function () {
                var self = this;

                this.draw();
                step++;

                if (!stop) {
                    this.timer = setTimeout(function () {
                        self.next();
                    }, 50);
                }
            };

            this.start = function () {
                var self = this;
                img.onload = function () {
                    self.draw();
                    self.next();
                };
                //img.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAWCAYAAAA1vze2AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA3XAAAN1wFCKJt4AAAAB3RJTUUH3gwWFRA7tUaoUwAAAbtJREFUSMet1D2MjUEUBuDHd10/SwRZEisabGRtSaIhkQjRaNBp1KJQYKNYyZYahU65nWhEI0iIhEQUFEthFSqJRZZsKPxdV3M+mUy++90/b3Iymfedec/8nBnqsRfPsYSjmbYKpzGDCQNiG96jHfEHaxJ9JtGWsHWQJCfQSozawZVYzLSLnYyKLjvJ9S3RboxIMTFIkuUVXCva9RXasm5JCqzNjN8kpiWeRfs27qhKg2YspFkSDUzjFa5hdfAjuJGc+fXM9GyivUh214h5i7hZDj6WVdDBbEVjUTmNilPYhHGsTPjjWcFcgKdZlUwZDlOx2NLvU4E92aCxHs3243AFP5L1Rwv8yMj0wZ3Eh1jRPG7jYfQf4378CM1kzoas0tpiYnpc50PcjW+Z1ikuJ6ZXMm1OXNyXIB5hNDmOrz0mmU0KYzPu4jPuJX6V2IWPPSaZrjOqe/Gn4ny74Tde91N+K3Cmjx2U8SB5xLUYx7s+zdO4hSOYrEsyP0SCMlr4iXWd7mTB8CjwPaISO/HrP+zmXN23D4fiB8gnLvSYYC6KpysmcSde+0vsCP5A9Nt4gn3Bb8clXM2+pH/4CxxszE7PhCmqAAAAAElFTkSuQmCC";
                img.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAWCAYAAAA1vze2AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA3XAAAN1wFCKJt4AAAAB3RJTUUH3wMRCycoY5y7DgAAAeBJREFUSMel1j9sTlEYBvD3fv2DIqmmmmjTBSXVkYSBhAixWNRmMYvBgMZQSUeLQWIw2hqLWIRBYpCIQYcyYDBJNAQpBk21P8u5cdzcfv1835Pc3JznOed9zn3f95zciCbAAbzEIk5VtI04jxmMRzvAKD76i1VszvSZTFvESDsmk1jxLyYz/UtFu7pWrEYTn9EafUcyGIiIgYo23o5Jdw23kt79NVrR1AQNbEEe+F0WtMSLiIiiKN5HxGqdluL1oB89JdGFabzGLWxKfB9ms5zfqdTsYqbNoT+LN5tqdq+cfLrSQUcrOxrGCLoqJg1sxxg2ZPyZSsNcCTyvdMlUdABMpc2W+NyIiP2VecMtBjuMEzVSX2U82B0RSxHRk5H5gTsbEbcjYig1wpuI2BoRx7I5cxFxqCiK5URtq3SawINKui6nxfvwU2u4npneqGjzkQr3LRFPMZil40eLJnfLxsAQHuErHpfx1sr5Xnxq0WS6Wf2anfhzKb/r4XeqVcvt14sL//EFJZ6Uh3g9gzF80D7u4yQm1rzU8DYi9kRnWE333WBRFN/rarIQnaMREb/SU5uu3VjWOS6haFaX41iqWbjQosE8eltpgAk8TKf9FXYl/kgawzMcTPxOXMPN/B8gxx+XbHMxap3gAwAAAABJRU5ErkJggg==";
            };

            this.setProgress = function (filesLoaded, filesToLoad) {
                percentage = Math.floor((filesLoaded / filesToLoad) * 100);
            };
        }
    }
);