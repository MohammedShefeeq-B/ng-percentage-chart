(function() {

    angular.module('ng-percentage-chart', [])
        .directive('percentageCircle', PercentageCircle);

    PercentageCircle.$inject = ['$timeout', '$interval'];

    function PercentageCircle($timeout, $interval) {
        return {
            restrict: 'A',
            scope: {
                data: "=data",
                radius: "=radius",
                stroke: "=stroke",
                anticlockwise: "=anticlockwise"
            },
            link: function(scope, elem, attrs) {
                var options = {
                    centerX: 0,
                    centerY: 0,
                    radius: scope.radius || 12,
                    anticlockwise: scope.anticlockwise || false,
                    colorArr: ['#1CD753', '#A0CC41', '#f1c40f', '#FF9E0F', '#FFA07A', '#DC4139'],
                    lineWidth: scope.stroke || 4,
                    emptyColor: 'rgba(170, 170, 170, 0.45)'

                };

                var data = scope.data;
                var totalDuration = attrs.duration;
                var canvas = document.createElement('canvas');
                canvas.width = canvas.height = 2 * options.radius + options.lineWidth;
                var ctx = canvas.getContext('2d');
                ctx.translate(canvas.width / 2, canvas.height / 2);
                ctx.lineWidth = options.lineWidth;
                elem.append(canvas);

                var presentCount = 0;
                for (var i = data.length - 1; i >= 0; i--) {
                    if (data[i]) {
                        presentCount++;
                    }
                }

                var presentPercent = presentCount / totalDuration * 100;

                function drawArc(startAngle, endAngle, outerStrokeColor, innerCircleColor) {

                    ctx.beginPath();
                    ctx.strokeStyle = outerStrokeColor;
                    ctx.arc(options.centerX, options.centerY, options.radius, startAngle, endAngle, options.anticlockwise);
                    ctx.stroke();

                    ctx.beginPath();
                    ctx.fillStyle = innerCircleColor;
                    ctx.arc(options.centerX, options.centerY, options.radius / 2, 0, Math.PI * 2);
                    ctx.fill();

                }

                function setInnerColor(percent) {
                    return (
                        percent > 80 ? options.colorArr[0] :
                        percent > 60 ? options.colorArr[1] :
                        percent > 40 ? options.colorArr[2] :
                        percent > 20 ? options.colorArr[3] :
                        percent > 0 ? options.colorArr[4] :
                        options.colorArr[5]
                    );
                }

                function setColor(val) {
                    if (val == 1) {
                        return options.colorArr[0];
                    } else if (val == 0) {
                        return options.colorArr[options.colorArr.length - 1];
                    } else {
                        return options.emptyColor;
                    }
                }

                function initGraph() {
                    // Init Drawing
                    var unitAngle = (360 / totalDuration) * Math.PI / 180;
                    var startAngle = -90 * Math.PI / 180;
                    var endAngle = 0;

                    if (!data.length) {
                        endAngle = 270 * Math.PI / 180;
                        // console.log(startAngle, endAngle);
                        drawArc(startAngle, endAngle, options.emptyColor, options.emptyColor);
                        return;
                    }
                    var lastMinuteInidication;
                    var endAngle = 0;

                    for (var i = 0; i < data.length; i++) {
                        if (i !== 0 && data[i] !== lastMinuteInidication) {
                            //console.log(data[i],lastMinuteInidication);
                            //check previous and next value (if both 1 make undefined to 1)
                            if (data[i] == undefined) {
                                if (data[i - 1] == 1 && data[i + 1] == 1) {
                                    data[i] = 1;
                                    endAngle += unitAngle;
                                } else {
                                    drawArc(startAngle, startAngle + endAngle, setColor(lastMinuteInidication), setInnerColor(presentPercent));
                                    startAngle += endAngle;
                                    endAngle = unitAngle;
                                }
                            } else {
                                drawArc(startAngle, startAngle + endAngle, setColor(lastMinuteInidication), setInnerColor(presentPercent));
                                startAngle += endAngle;
                                endAngle = unitAngle;
                            }
                            //console.log(data[i],lastMinuteInidication);

                        } else {
                            endAngle += unitAngle;
                        }

                        lastMinuteInidication = data[i];
                    }
                    drawArc(startAngle, startAngle + endAngle, setColor(lastMinuteInidication), setInnerColor(presentPercent));
                    startAngle += endAngle;
                    if (data.length < totalDuration) {
                        drawArc(startAngle, startAngle + (totalDuration - data.length) * unitAngle, setColor(), setInnerColor(presentPercent));
                    }
                }
                initGraph();
            }
        }
    }

})();