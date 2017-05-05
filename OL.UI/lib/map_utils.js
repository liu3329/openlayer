
var map, vectorLayer;
var highlightStyleCache = {};
var container = document.getElementById('popup_container');
var content = document.getElementById('popup_content');
var closer = document.getElementById('popup_closer');

//创建一个以弹出窗口形式的覆盖物
var overlay = new ol.Overlay({
    element: container,  //覆盖物的元素
    //autoPan: false,
    //positioning: 'center-right',
    //autoPanAnimtaion: {
    //    duration:250
    //}
});

//关闭按钮点击时
closer.onclick = function () {
    overlay.setPosition(undefined); //让覆盖物失去
    //close.blur(); //取消焦点
    return false;
};


//定义矢量图层的样式
var style = new ol.style.Style({
    fill: new ol.style.Fill({ //矢量图层的颜色和透明度
        color: 'red'
    }),
    stroke: new ol.style.Stroke({//设置边界样式
        color: '#319FD3',
        width: 1
    }),
    text: new ol.style.Text({//文本样式
        fill: new ol.style.Fill({
            color: '#000'
        }),
        stroke: new ol.style.Stroke({
            color: '#fff',
            width: 3
        })
    })
});

//定义矢量图层
vectorLayer = new ol.layer.Vector({
    source: new ol.source.Vector({
        url: "data/countries.geojson",
        format:new ol.format.GeoJSON()
    }),
    style: function (feature, resolution) {
        style.getText().setText(resolution < 5000?feature.get('name'):""); //如果分辨率《5000 显示文本
        return style; //返回定义的样式
    }

});



map = new ol.Map({
    target: 'map',
    layers: [
        //新建瓦片服务
        new ol.layer.Tile({
            source: new ol.source.OSM()
        }),
        vectorLayer
    ],
    overlays: [overlay],
    view: new ol.View({
        center: [0, 0],
        zoom: 1
    }),
    controls: ol.control.defaults().extend([
        new ol.control.OverviewMap()
    ])
});



//地图的单击事件时，弹出popup
map.on('singleclick', function (evt) {
    var coordinate = evt.coordinate;  //返回浏览器事件的视图投影中的坐标
    var pixel = map.getEventPixel(evt.originalEvent); //返回浏览器事件相对于视口的地图像素位置
    var feature = map.forEachFeatureAtPixel(pixel, function (feature, layer) { //检测与地图像素相交的feature，如果找到返回与之匹配的feature
        return feature  
    });
    var hdms = ol.coordinate.toStringHDMS(ol.proj.transform(coordinate, 'EPSG:3857', 'EPSG:4326'));
    content.innerHTML = '<P>here:' + hdms + ';这里是'+feature.get('name')+'</P>';
    overlay.setPosition(coordinate); //设置overlay的位置
});