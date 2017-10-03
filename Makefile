all:static/css/coupondetail.css static/css/shopdetail.css static/css/shopitem.css static/css/index.css
	@echo "1"

static/css/coupondetail.css: less/coupondetail.less
	lessc less/coupondetail.less static/css/coupondetail.css

static/css/shopdetail.css: less/shopdetail.less
	lessc less/shopdetail.less static/css/shopdetail.css

static/css/shopitem.css: less/shopitem.less
	lessc less/shopitem.less static/css/shopitem.css

static/css/index.css: less/index.less
	lessc less/index.less static/css/index.css
