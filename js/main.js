//预加载图片
img1 = new Image(); 
img2 = new Image();
img3 = new Image();
img4 = new Image();
img5 = new Image();
img6 = new Image();
img7 = new Image();
img8 = new Image();
img9 = new Image();
img10 = new Image();
img11 = new Image();
img12 = new Image();
img13 = new Image();
img14 = new Image();
img15 = new Image();  
img1.src = "./component/solution.png"; 
img2.src = "./component/initial-reactor-1.png";
img3.src = "./component/resin.jpeg";
img4.src = "./component/monomer.png";
img5.src = "./component/decompose.png";
img6.src = "./component/decompose-reverse.png";
img7.src = "./component/st.png";
img8.src = "./component/initial-reactor.png";
img9.src = "./component/compound.png";
img10.src = "./component/compound-2.png";
img11.src = "./component/compound-3.png";
img12.src = "./component/compound-4.png";
img13.src = "./component/compound-5.png";
img14.src = "./component/compound-6.png";
img15.src = "./component/redcircle.png";
//防抖函数
function debounce(fn, delay) {
    var timer = null; // 维护一个 timer
    return function () {
        var _this = this; // 取debounce执行作用域的this
        var args = arguments;
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(function () {
            fn.apply(_this, args); // 用apply指向调用debounce的对象，相当于_this.fn(args);
        }, delay);
    };
}

//	window.addEventListener("load", () => {
	$(document).ready(function(){
        // 先获取画布
        const cvs = document.querySelector("canvas");
        // 再返回一个2d的绘图环境
        const ctx = cvs.getContext("2d");
        let flag = false;//搅拌器开关
        let radius = 0;//视距初始值
        let oringinX = 200;//直线运动初始值
        let oringinY = 200;//纵向直线运动初始值
        //比例缩放系数
        let scaleOrigin = 1;
        let scaleBegin = 1;
        let img8X = 115;
        let img8Y = 25;
        //放大视距按钮判断（防止bug）
        let btnOn = false;
    
		const waterColor = ctx.createLinearGradient(0,0,300,0)
        waterColor.addColorStop(0,"#39eafd");
        waterColor.addColorStop(0.3,"#0b648f");
        waterColor.addColorStop(1,"#0096c7");

        const oilColor = ctx.createLinearGradient(0,0,300,0)
        oilColor.addColorStop(0,"#dd8130");
        oilColor.addColorStop(1,"#ffc300");


        //模拟单体「布朗」运动
        function brownianMotion(min, max) {
            return Math.random()*(max-min)+min;
        }

        //搅拌器打开函数
        document.querySelector('#switch').onclick = blenderOn;
        function blenderOn(){ flag = true;
            $('#copycanvas')[0].setAttribute('style', 'display: inline');}

        function createBlender0(){
            ctx.beginPath();
            ctx.arc(100, 200, 100, 0, Math.PI, false);
            ctx.fillStyle = waterColor;
            ctx.fill();
            ctx.beginPath();
            ctx.fillStyle = waterColor;
            ctx.fillRect(0, 100, 200, 100);
            ctx.fill();
            ctx.beginPath();
            ctx.fillStyle = oilColor;
            ctx.fillRect(0, 50, 200, 50);
            ctx.fill();
            fillRoundRect(ctx, 98, 0, 4, 245, 1, "#1b1b1b");
        }

        function createBlender1(){
            ctx.beginPath();
            ctx.arc(100, 200, 100, 0, Math.PI, false);
            ctx.fillStyle = waterColor;
            ctx.fill();
            ctx.beginPath();
            ctx.fillStyle = waterColor;
            ctx.fillRect(0, 100, 200, 100);
            ctx.fill();
            ctx.beginPath();
            ctx.fillStyle = waterColor;
            ctx.fillRect(0, 50, 200, 50);
            ctx.fill();
            fillRoundRect(ctx, 98, 0, 4, 245, 1, "#1b1b1b");
            fillRoundRect(ctx, 98, 0, 4, 245, 1, "#1b1b1b");
        }

        //填充圆角矩形绘制方法
        function fillRoundRect(ctx, x, y, width, height, radius, fillColor){
            if ( 2* radius > width || 2 * radius > height) {return false; }
             ctx.save();
             ctx.translate(x, y);
             drawRoundRectPath(ctx, width, height, radius);
             ctx.fillStyle = fillColor || "#000";
             ctx.fill();
             ctx.restore();
        }

        function drawRoundRectPath(ctx, width, height, radius) {
            ctx.beginPath(0);
            //从右下角顺时针绘制，弧度从0到1/2PI  
            ctx.arc(width - radius, height - radius, radius, 0, Math.PI / 2);
            //矩形下边线  
            ctx.lineTo(radius, height);
            //左下角圆弧，弧度从1/2PI到PI  
            ctx.arc(radius, height - radius, radius, Math.PI / 2, Math.PI);
            //矩形左边线  
            ctx.lineTo(0, radius);
            //左上角圆弧，弧度从PI到3/2PI  
            ctx.arc(radius, radius, radius, Math.PI, Math.PI * 3 / 2);
            //上边线  
            ctx.lineTo(width - radius, 0); 
            //右上角圆弧  
            ctx.arc(width - radius, radius, radius, Math.PI * 3 / 2, Math.PI * 2);
            //右边线  
            ctx.lineTo(width, height - radius);
            ctx.closePath();
        }
            //图片放大
            var imgZoomin = function(){
                var scl = 0.1;
                var vX = 20;
                var vY = 18;
                ctx1.drawImage(img8, img8X, img8Y, 350*scaleOrigin, 300*scaleOrigin);
                if(scaleOrigin < 4){
                    scaleOrigin += scl;
                    img8X -= vX;
                    img8Y -= vY;
                }               
            }
            //图片缩小
            var imgZoomout = function(){
                var scl = 0.1;
                ctx1.drawImage(img14, 0, 20, 600*scaleBegin, 350*scaleBegin);
                if(scaleBegin >= 0.2){
                    scaleBegin -= scl;
                }
            }

            var straightLine = function(){   //直线运动
                var vX = 1;
                ctx1.drawImage(img7, oringinX, 25, 290, 180);
                if(oringinX >= 150)
                    oringinX -= vX;
            };
            var straightYline = function(){   //直线运动
                var vY = 1;
                ctx1.drawImage(img7, 197, oringinY, 290, 180);
                if(oringinY >= 30)
                    oringinY -= vY;
            };

            var straightLinelow = function(){   //直线运动
                var vX = 1;
                ctx1.drawImage(img5, oringinX, 95, 290, 180);
                if(oringinX >= 170)
                    oringinX -= vX;
            };
            var straightYlinelow = function(){   //直线运动
                var vY = 1;
                ctx1.drawImage(img7, 197, oringinY, 290, 180);
                if(oringinY >= 80)
                    oringinY -= vY;
            };

            var drawCircle = function() {
                ctx1.drawImage(img2, 115, 35, 280+radius, 230+radius);
                ctx1.beginPath();
                ctx1.arc(295, 190, 110+radius, 0, Math.PI * 2);
                ctx1.strokeStyle = oilColor;
                ctx1.stroke();
                if (radius < 70) 
                    radius += 0.5};

            function Paddle(){};
            Paddle.prototype = {
                init:function(){
                    this.midX = 100;
                    //this.rightX = 350;
                    this.speed = 0.05;
                    this.angle = Math.PI/2;
                    this.length = 50;
                },
                //绘画属性
                draw:function(){
                    ctx.beginPath();
                    ctx.fillStyle = "#c8c8c8";
                    ctx.moveTo(100, 245);
                    ctx.lineTo(this.midX - this.length * Math.sin(this.angle), 235);
                    ctx.lineTo(this.midX - this.length * Math.sin(this.angle), 255);
                    ctx.fill();
                    ctx.beginPath();
                    ctx.fillStyle = "#c8c8c8";
                    ctx.moveTo(100, 245);
                    ctx.lineTo(this.midX + this.length * Math.sin(this.angle), 235);
                    ctx.lineTo(this.midX + this.length * Math.sin(this.angle), 255);
                    ctx.fill();
                },
                rotate:function(){
                    this.angle += this.speed;
                    if (this.angle > 2*Math.PI || this.angle < 0)
                        this.speed = -this.speed;
                    this.draw();//每次运动之后就要进入画的的下一帧
                }
            };

        function Monomer(){};
            Monomer.prototype = {
                init:function(){
                    this.x = brownianMotion(10, 190);
                    this.y = brownianMotion(50, 200);
                    this.r = brownianMotion(2,6);
                    this.vX = brownianMotion(-1,1);
                    this.vY = brownianMotion(-1,1);
                },
                draw:function(){
                    ctx.beginPath();
                    ctx.fillStyle = "#fdbb30";
                    ctx.arc(this.x,this.y,this.r,0,Math.PI*2);
                    ctx.fill();
                },
                move:function(){
                    this.x += this.vX;
                    this.y += this.vY;
                    if(this.x - this.r < 10||this.x+this.r>190)//当球碰到搅拌器x轴运动边缘就反弹
                        this.vX = -this.vX;
                    if(this.y - this.r < 50||this.y+this.r>200)//当球碰到搅拌器y轴运动边缘就反弹
                        this.vY = -this.vY;
                    this.draw();
                }
        };
    //创建monomer对象的实例  ->  创建一个单体
    //用for循环可以创建多个单体  将它包含在一个函数里面，方便多次使用
    //创建一个数组存放残生的单体
        var arr = new Array();
        function createMonomer(num){
            for(var i = 0;i < num;i++){
                var monomer = new Monomer();//创建一个新的单体
                arr.push(monomer);//将每次创建的单体丢进数组里
                monomer.init();
                monomer.draw();
            }
        }
    createMonomer(100);//创建100个单体
    var paddle = new Paddle();//创建桨叶实例
    paddle.init();
    paddle.draw();

    setInterval(function(){//实现画中帧的播放
        ctx.clearRect(0,0,1000,500);//每次播放新的下一帧之前要对上一帧进行清除工作
        //绘制搅拌器简笔画
        if(flag){
            createBlender1();
            paddle.rotate();
            for(var item of arr){
            item.move();//移动
            }
        }else{createBlender0();}
 
    },1000/100);//1000/100代表是1000ms 100张   ->   1s 100张
    //微观图背景
    const cvs1 = document.querySelector("#copycanvas");
    const ctx1 = cvs1.getContext("2d");
    img1.onload = function(){
        ctx1.drawImage(img1,0,0,600,400);
        ctx1.font = '30px 微软雅黑';
        ctx1.fillStyle = "#000";
        ctx1.fillText('溶液内含有BPO、苯乙烯单体、二乙烯基苯', 20, 485);
        ctx1.fillText('反应体系放大图', 190, 450);
    }
   var magnifier = document.getElementById('magnifier');
   let timer = null;
   var zoomInsysF = throttle(zoomInsys,1000);
   //节流函数
    function throttle(fn, threshold) {
    let prev = Date.now();
    return function() {
        let context = this, args = arguments;
        let now = Date.now();
        if( now - prev > threshold){
            prev = now;
            fn.apply(context,args);
        }
        }

}
let playIdx = 0
    magnifier.onclick = function(){
        if(playIdx == 0){
            zoomInsysF()
        } else{
        }
    }
    function zoomInsys(){
        $("#tip").css("display","none");
        playIdx = 1;
        if(radius <= 130){
            var systemDraw = setInterval(function(){
                ctx1.clearRect(0, 0, 600, 500);
                drawCircle();
                if(radius == 70){
                    clearInterval(systemDraw);
                    setTimeout(function(){
                        var imgScale = setInterval(function(){
                            ctx1.clearRect(0, 0, cvs1.width, cvs1.height);
                            imgZoomin();
                            if(scaleOrigin >= 4){
                                clearInterval(imgScale);}
                    setTimeout(function(){
                        ctx1.clearRect(0, 0, cvs1.width, cvs1.height);
                        ctx1.drawImage(img15, 165, 10, 270, 200);},3500)
                        },100)
                    },7000)
                    setTimeout(function(){
                        ctx1.clearRect(0, 0, cvs1.width, cvs1.height);
                        ctx1.drawImage(img4, 100, 0, 300, 200);
                        ctx1.beginPath();
                        ctx1.lineWidth = 4;
                        ctx1.strokeStyle = "black";
                        ctx1.moveTo(245, 85);
                        ctx1.lineTo(255, 110);
                        ctx1.stroke();
                        },14000)
                    setTimeout(function(){
                        ctx1.clearRect(0, 0, cvs1.width, cvs1.height);
                        ctx1.drawImage(img5, 190, 0, 290, 180);
                        ctx1.drawImage(img6, 40, 20, 290, 180);
                    },19000)
                    setTimeout(function(){
                        ctx1.clearRect(0, 0, cvs1.width, cvs1.height);
                        ctx1.drawImage(img6, 40, 20, 290, 180);
                        var react1 = setInterval(function(){
                            ctx1.clearRect(0, 0, cvs1.width, cvs1.height);
                            ctx1.drawImage(img6, 40, 20, 290, 180);
                            straightLine();
                        if(oringinX == 150)
                            {clearInterval(react1);
                            oringinX = 400;}
                        },10);
                    },24000)
                   setTimeout(function(){
                        ctx1.clearRect(0, 0, cvs1.width, cvs1.height);
                        ctx1.drawImage(img9, 100, 20, 300, 150);
                        var react2 = setInterval(function(){
                            ctx1.clearRect(0, 0, cvs1.width, cvs1.height);
                            ctx1.drawImage(img9, 100, 20, 300, 150);
                            straightYline();
                            if(oringinY == 30){
                                clearInterval(react2);
                                oringinY = 400;
                                }
                        },10)
                    },27000)
                    setTimeout(function(){
                        ctx1.clearRect(0, 0, cvs1.width, cvs1.height);
                        ctx1.drawImage(img10, 100, 20, 300, 150);
                        var react3 = setInterval(function(){
                            ctx1.clearRect(0, 0, cvs1.width, cvs1.height);
                            ctx1.drawImage(img10, 100, 20, 300, 150);
                            straightLine();
                            straightYline();
                            if(oringinY == 30){
                                clearInterval(react3);
                                oringinX = 400;
                                oringinY = 400;}
                        },10)
                    },31000) 
                    setTimeout(function(){
                        ctx1.clearRect(0, 0, cvs1.width, cvs1.height);
                        ctx1.drawImage(img11, 100, 20, 600, 350);
                        var react4 = setInterval(function(){
                            ctx1.clearRect(0, 0, cvs1.width, cvs1.height);
                            ctx1.drawImage(img11, 80, 20, 600, 350);
                            straightYlinelow();
                            straightLinelow();
                            if(oringinY == 80){
                                clearInterval(react4);
                                oringinY = 300;
                                oringinX = 300;
                            }
                        },10)
                    },35000)
                    setTimeout(function(){
                        ctx1.clearRect(0, 0, cvs1.width, cvs1.height);
                        ctx1.drawImage(img12, 0, 20, 600, 350);
                        var react5 = setInterval(function(){
                            ctx1.clearRect(0, 0, cvs1.width, cvs1.height);
                            ctx1.drawImage(img12, 0, 20, 600, 350);
                            straightYlinelow();
                            straightLine();
                            if(oringinY == 80){
                                clearInterval(react5);
                                oringinY = 300;
                                oringinX = 300;
                            }
                        },10)
                    },39000)
                    setTimeout(function(){
                        ctx1.clearRect(0, 0, cvs1.width, cvs1.height);
                        ctx1.drawImage(img13, 0, 20, 600, 350);
                        var react6 = setInterval(function(){
                            ctx1.clearRect(0, 0, cvs1.width, cvs1.height);
                            ctx1.drawImage(img13, 0, 20, 600, 350);
                            straightYlinelow();
                            straightLine();
                            if(oringinY == 80){
                                clearInterval(react6);
                                oringinY = 400;
                                oringinX = 400;
                            }
                        },10)
                    },44000)
                    setTimeout(function(){
                        ctx1.clearRect(0, 0, cvs1.width, cvs1.height);
                        ctx1.drawImage(img14, 0, 20, 600, 350);
                            var zoomOut = setInterval(function(){
                                ctx1.clearRect(0, 0, cvs1.width, cvs1.height);
                                imgZoomout();
                                if(scaleBegin <= 0.3){
                                    clearInterval(zoomOut);
                                    ctx1.clearRect(0, 0, cvs1.width, cvs1.height);
                                    ctx1.drawImage(img3, 150, 100, 450, 350);
                                }
                            },500)
                    },49000)
     
                }  
            },10);}}
    }

);    
