less_src := $(wildcard less/*.less)
less_obj := $(patsubst less/%.less,static/css/%.css,$(less_src))

all:$(less_obj)
	@echo "1"

$(less_obj):static/css/%.css :less/%.less
	lessc $^ $@
