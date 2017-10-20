.carousel .item {
    /* .p2r(height, 320); */
}

.carousel-indicators {
    .p2r(bottom, 30);
    margin-bottom:0px;
}

.carousel-indicators li, .carousel-indicators .active {
    .p2r(margin-left, 18);
    .p2r(margin-right, 18);
    padding:0px;
    margin-top:0;
    margin-bottom:0;
    /* .p2r(width,14); */
    /* .p2r(height,14); */
    /* .p2r(border-radius,7); */
    /* width:8px; */
    /* height:8px; */
    /* border-radius:4px; */
}

[data-dpr="1"]
.carousel-indicators li, .carousel-indicators .active {
    width:7px;
    height:7px;
    border-radius:3.5px;
}

[data-dpr="2"]
.carousel-indicators li, .carousel-indicators .active {
    width:14px;
    height:14px;
    border-radius:7px;
}

[data-dpr="3"]
.carousel-indicators li, .carousel-indicators .active {
    width:21px;
    height:21px;
    border-radius:10.5px;
}

.carousel-inner > .item > img {
    width:100%;
    /* height:100%; */
    height:auto;
    object-fit:fill;
}

a.carousel-control.right,
a.carousel-control.left {
    opacity: 0;
    filter:alpha(opacity=0); /* IE support */
}
