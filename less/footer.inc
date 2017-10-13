.p2r(@name, @px){
    @{name}: @px / 75 * 1rem;
}

#footer {
    position:fixed;
    bottom:0;
    .p2r(height,100);
    width:100%;
    display:flex;
    align-items:center;
    justify-content:space-around;
    background:#f6f6f6;
    color:#999999;
}

.footerItem {
    .p2r(padding-top,15);
    text-align:center;
}

.footerItemImage {
    .p2r(height,40);
}

.footerItemImage > img {
    object-fit:contain;
    height:100%;
}

.footerItemPActive {
    color:#f35e3e;
}