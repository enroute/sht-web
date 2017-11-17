//执行命令输出
// fis3 release -d ../output

//启用插件 
fis.hook('relative'); 
//让所有文件，都使用相对路径。 
fis.match('**', { relative: true })

// fis.match('*.{png,js,css}', {
//   release: '/static/$0'
// });
fis.match('*.{js,css}', {
  useHash: true
});






// fis.match('::packager', {
//   spriter: fis.plugin('csssprites')
// });

// fis.match('*', {
//   useHash: false
// });

// fis.match('*.js', {
//   optimizer: fis.plugin('uglify-js')
// });

// fis.match('*.css', {
//   useSprite: true,
//   optimizer: fis.plugin('clean-css')
// });

// fis.match('*.png', {
//   optimizer: fis.plugin('png-compressor')
// });