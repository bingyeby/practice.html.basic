https://segmentfault.com/a/1190000007495768
HTML5 中 canvas 的使用总结 (API快速总结)


（1）绘制路径
ctx.beginPath(); // 开始路径绘制
ctx.moveTo(20, 20); // 设置路径起点，坐标为(20,20)
ctx.lineTo(200, 20); // 绘制一条到(200,20)的直线
ctx.lineWidth = 1.0; // 设置线宽
ctx.strokeStyle = '#CC0000'; // 设置线的颜色
ctx.stroke(); // 进行线的着色，这时整条线才变得可见
moveto和lineto方法可以多次使用。最后，还可以使用closePath方法，自动绘制一条当前点到起点的直线，形成一个封闭图形，省却使用一次lineto方法。


（2）绘制矩形
ctx.fillStyle = 'yellow';
ctx.fillRect(50, 50, 200, 100);// 实

ctx.strokeStyle = '#CC0000';
ctx.strokeRect(10,10,200,100);// 空心

ctx.clearRect(100,50,50,50);// 清空

（3）绘制文本
ctx.font = "Bold 20px Arial"; // 设置字体
ctx.textAlign = "left";// 设置对齐方式
ctx.fillStyle = "#008600"; // 设置填充颜色
ctx.fillText("Hello!", 10, 50); // 设置字体内容，以及在画布上的位置
ctx.strokeText("Hello!", 10, 100); // 绘制空心字

（4）绘制圆形和扇形
ctx.arc(x, y, radius, startAngle, endAngle, anticlockwise);

实心的圆形:
ctx.beginPath();
ctx.arc(60, 60, 50, 0, Math.PI*2, true);
ctx.fillStyle = "#000000";
ctx.fill();
空心圆形的例子:

ctx.beginPath();
ctx.arc(60, 60, 50, 0, Math.PI*2, true);
ctx.lineWidth = 1.0;
ctx.strokeStyle = "#000";
ctx.stroke();


（5）设置渐变色

createLinearGradient方法用来设置渐变色。

var myGradient = ctx.createLinearGradient(0, 0, 0, 160);
myGradient.addColorStop(0, "#BABABA");
myGradient.addColorStop(1, "#636363");
createLinearGradient方法的参数是(x1, y1, x2, y2)，其中x1和y1是起点坐标，x2和y2是终点坐标。通过不同的坐标值，可以生成从上至下、从左到右的渐变等等。
使用方法如下：

ctx.fillStyle = myGradient;
ctx.fillRect(10,10,200,100);

（6）设置阴影

一系列与阴影相关的方法，可以用来设置阴影。

ctx.shadowOffsetX = 10; // 设置水平位移
ctx.shadowOffsetY = 10; // 设置垂直位移
ctx.shadowBlur = 5; // 设置模糊度
ctx.shadowColor = "rgba(0,0,0,0.5)"; // 设置阴影颜色
ctx.fillStyle = "#CC0000";
ctx.fillRect(10,10,200,100);



3. 图像处理方法
var image = new Image();
image.onload = function() {
    var canvas = document.createElement('canvas');
    canvas.width = image.width;
    canvas.height = image.height;
    canvas.getContext('2d').drawImage(image, 0, 0);
    // 插入页面底部
    document.body.appendChild(image);
    return canvas;
}
image.src = 'image.png';

getImageData方法，putImageData方法

getImageData方法可以用来读取Canvas的内容，返回一个对象，包含了每个像素的信息。

var imageData = context.getImageData(0, 0, canvas.width, canvas.height);
imageData对象有一个data属性，它的值是一个一维数组。该数组的值，依次是每个像素的红、绿、蓝、alpha通道值，因此该数组的长度等于 图像的像素宽度 x 图像的像素高度 x 4，每个值的范围是0–255。这个数组不仅可读，而且可写，因此通过操作这个数组的值，就可以达到操作图像的目的。修改这个数组以后，使用putImageData方法将数组内容重新绘制在Canvas上。

context.putImageData(imageData, 0, 0);
toDataURL方法

对图像数据做出修改以后，可以使用toDataURL方法，将Canvas数据重新转化成一般的图像文件形式。

function convertCanvasToImage(canvas) {
    var image = new Image();
    image.src = canvas.toDataURL('image/png');
    return image;
}
上面的代码将Canvas数据，转化成PNG data URI。



5.像素处理
通过getImageData方法和putImageData方法，可以处理每个像素，进而操作图像内容。
假定filter是一个处理像素的函数，那么整个对Canvas的处理流程，可以用下面的代码表示。

if (canvas.width > 0 && canvas.height > 0) {
    var imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    filter(imageData);
    context.putImageData(imageData, 0, 0);
}
灰度效果 d[i] = d[i + 1] = d[i + 2] = (r+g+b)/3;
复古效果
红色蒙版效果
亮度效果
反转效果