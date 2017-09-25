all:static/css/coupondetail.css
	@echo "1"
static/css/coupondetail.css: less/coupondetail.less
	lessc less/coupondetail.less static/css/coupondetail.css