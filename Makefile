all:static/css/coupondetail.css static/css/shopdetail.css static/css/shopitem.css static/css/index.css static/css/myself.css static/css/rewardnew.css
	@echo "1"

static/css/coupondetail.css: less/coupondetail.less
	lessc less/coupondetail.less static/css/coupondetail.css

static/css/shopdetail.css: less/shopdetail.less
	lessc less/shopdetail.less static/css/shopdetail.css

static/css/shopitem.css: less/shopitem.less
	lessc less/shopitem.less static/css/shopitem.css

static/css/index.css: less/index.less
	lessc less/index.less static/css/index.css

static/css/myself.css: less/myself.less
	lessc less/myself.less static/css/myself.css

static/css/rewardnew.css: less/reward.less
	lessc less/reward.less static/css/rewardnew.css
