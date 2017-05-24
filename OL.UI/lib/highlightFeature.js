//浏览器事件是一个指针移动事件，
map.on('pointermove', function (evt) {
    if (evt.dragging) { //如果是拖动地图造成的鼠标移动，则不作处理
        return false;
    }
    var piexl = map.getEventPixel(evt.originalEvent);
    displayFeatureInfo(piexl);
});
var highlight;
//显示图层信息
var displayFeatureInfo = function (piexl) {
    //返回与鼠标点击相同的图形
    var feature = map.forEachFeatureAtPixel(piexl, function (feature, layer) {
        return feature;
    })
    if (feature !== highlight) {
        //如果图形不高亮，移除高亮图层
        if (highlight) {
            featureOverlay.getSource().removeFeature(highlight);
        }
        if (feature) {
            featureOverlay.getSource().addFeature(feature);
        }
        highlight = feature;
    }
};
//新建高亮覆盖层
var featureOverlay = new ol.layer.Vector({
    source: new ol.source.Vector(),
    map: map,
    style: function (feature, resolution) {
        var text = resolution < 10000 ? feature.get('name') : '';
        //如果图形的name不为空，设置样式
        var overlayStyle;
        if (feature.get('name') != "") {
            overlayStyle = new ol.style.Style({
                stroke: new ol.style.Stroke({
                    color: 'white',
                    width: 1
                }),
                fill: new ol.style.Fill({
                    color: 'rgba(246,138,30,0.5)'
                }),
                text: new ol.style.Text({
                    font: '12px Calibri,sans-serif',
                    text: text,
                    fill: new ol.style.Fill({
                        color: 'white'
                    }),
                    stroke: new ol.style.Stroke({
                        color: 'white',
                        width: 1
                    })
                })
            });
        }
        return overlayStyle;
    }
});