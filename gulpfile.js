const gulp = require('gulp');
const babel = require('gulp-babel');//transpile from ES6 to ES5
const image = require('gulp-image');//compress images
const pug = require('gulp-pug');//compile pug to html
const htmlmin = require('gulp-htmlmin');//minify html
//const rename = require('gulp-rename');//todo: install this, check syntax
const autoprefixer = require('gulp-autoprefixer');//prefix css for each browser
const cleanCSS = require('gulp-clean-css');//minify etc. css
const uglify = require('gulp-uglify');//minify js
const pump = require('pump');//pipe atomically
//const jshint = require('gulp-jshint');//lint js
const concatjs = require('gulp-concat');//concatjs js
/*const settings = require('./src/settings.js');//server data such as products and currency
const products = settings.products;
const categories = settings.categories;
const currencySymbol = settings.currencySymbol;*/
const htmlminOptions = {
	collapseBooleanAttributes: true,
	minifyCSS: true,
	minifyJS: true,
	removeComments:true,
	sortAttributes:true,
	sortClassName:true
};
gulp.task('routes', function(cb){
	pump([
		gulp.src('src/routes/index.js'),
		gulp.dest('dist/routes/')
	], cb)
});
gulp.task('index', function(cb){
	pump([
		gulp.src('src/views/index.pug'),
		pug(),
		htmlmin(htmlminOptions),
		gulp.dest('dist/views/')
	], cb)
});
gulp.task('error-page', function(cb){
	pump([
		gulp.src('src/views/error.pug'),
		pug(),
		gulp.dest('dist/views/')
	], cb)
})
gulp.task('images', function(cb){
		pump([
		gulp.src('src/public/images/*.{jpg,png,svg}'),
		image({guetzli: false, zopflipng:false}),
		gulp.dest('dist/public/images')
		], cb)
	}
);
gulp.task('bin', () => gulp.src('src/bin/www').pipe(gulp.dest('dist/bin/')));

gulp.task('favicon', () => gulp.src('src/public/favicon.ico').pipe(gulp.dest('dist/public')));

gulp.task('css', function(cb){
		pump([
			gulp.src('src/public/stylesheets/*.css'),
			autoprefixer({
				browsers: ['last 2 versions'],
				cascade: false
			}),
			cleanCSS(),
			gulp.dest('dist/public/stylesheets')
		], cb)
	}
);
gulp.task('js', function(cb){
		pump([
			gulp.src(['src/public/js/*js']),
			concatjs('bundle.js'),
			babel({
				presets: ['env']
			}),
			uglify(),
			gulp.dest('dist/public/js')
		], cb)
	}
);
gulp.task('app', () => gulp.src('src/app.js').pipe(gulp.dest('dist')));

gulp.task('bin', () => gulp.src('src/bin/www').pipe(gulp.dest('dist/bin/')));

gulp.task('notimages', ['routes', 'index', 'app', 'error-page', 'favicon', 'bin', 'css', 'js']);
gulp.task('default', ['routes', 'index', 'app', 'error-page', 'favicon', 'bin', 'css', 'js', 'images']);

/*const uuidV4 = require('uuid/v4');//unique id
let nonce1 = uuidV4();*/

/*gulp.task('main', () => gulp.src('src/main.js').pipe(gulp.dest('dist')));

gulp.task('bin', () => gulp.src('src/bin/www').pipe(gulp.dest('dist/bin/')));

gulp.task('settings',  () => gulp.src('src/settings.js').pipe(gulp.dest('dist')));*/

/*gulp.task('views', () => gulp.src('src/views/*.pug').pipe(gulp.dest('dist/views')));*/

//let arrProductPages = ['storefront', 'error-page'];
//create tasks to compile product pages for each product (from pug to html)
/*products.forEach(function(product, i){
	let sTaskName = 'product-page-'+i;
	arrProductPages.push(sTaskName);
	gulp.task(sTaskName, function(cb){
		let pageName = (product.name.replace(/ /g,"-"))+'.html';//put - for spaces
		pump([
			gulp.src('src/views/product-page.pug'),
			pug({
				locals:{id:i, products:products, product:{id:product.id, name:product.name, price:product.price, description:settings.descriptions[i], imageURL:product.imageURL, backgroundSize:product.backgroundSize}, currency:currencySymbol}
			}),
			htmlmin(htmlminOptions),
			rename(pageName),
			gulp.dest('dist/views/')
		], cb)
	});
});*/
/*gulp.task('storefront', function(cb){
	pump([
		gulp.src('src/views/index.pug'),
		pug({
			locals:{products: products, categories:categories, currency:currencySymbol}
		}),
		htmlmin(htmlminOptions),
		gulp.dest('dist/views/')
	], cb)
});
gulp.task('error-page', function(cb){
	pump([
		gulp.src('src/views/error.pug'),
		pug(),
		gulp.dest('dist/views/')
	], cb)
});*/

/*gulp.task('compile-pug', arrProductPages);
gulp.task('compile-pug-fast', ['storefront']);
gulp.task('admin', function(cb){
	pump([
		gulp.src('src/views/admin.pug'),
		gulp.dest('dist/views/')
	], cb)
});*/
//todo, prepare main.js to sendFile the html files instead of render pug...
/*
products.forEach(function(product, i){
	app.get('/'+(product.name.replace(/ /g,"-")), limiter.middleware(), function(req, res, next){
		newVisitor.ip = req.ip;//getIP(req);
		res.render('product-page', {id:i, nonce1:nonce1, products:products, product:{id:product.id, name:product.name, price:product.price, description:settings.descriptions[i], imageURL:product.imageURL, backgroundSize:product.backgroundSize}, currency:currencySymbol});
	});
});
app.get('/', limiter.middleware(), function(req, res, next) {
	newVisitor.ip = req.ip;//getIP(req);
	res.render('index', { products: products, nonce1:nonce1, categories:categories, currency:currencySymbol});
});
*/

/*gulp.task('favicon', () => gulp.src('src/public/favicon.ico').pipe(gulp.dest('dist/public')));

gulp.task('manifest', () => gulp.src('src/public/manifest.manifest').pipe(gulp.dest('dist/public')));

gulp.task('css', function(cb){
		pump([
			gulp.src('src/public/stylesheets/*.css'),
			autoprefixer({
				browsers: ['last 2 versions'],
				cascade: false
			}),
			cleanCSS(),
			gulp.dest('dist/public/stylesheets')
		], cb)
	}
);
gulp.task('cssfast', function(cb){
		pump([
			gulp.src('src/public/stylesheets/*.css'),
			gulp.dest('dist/public/stylesheets')
		], cb)
	}
);

gulp.task('js', function(cb){
		pump([
			gulp.src(['!src/public/js/moment.min.js', 'src/public/js/*.js', 'src/public/js/*.min.js']),
			babel({
				presets: ['env']
			}),
			gulp.dest('dist/public/js'),
			gulp.src('src/public/js/moment.min.js'),
			gulp.dest('dist/public/js')
		], cb)
	}
);
gulp.task('jsmin', function(cb){
		pump([
			gulp.src(['!src/public/js/moment.min.js', 'src/public/js/*.js', 'src/public/js/*.min.js']),
			babel({
				presets: ['env']
			}),
			uglify({
				mangle: {
					reserved: ['products', 'categories', 'currency', 'nonce1']
				}
			}),
			gulp.dest('dist/public/js'),
			gulp.src('src/public/js/moment.min.js'),
			gulp.dest('dist/public/js')
		], cb)
	}
);
//concatjs and transpile js
gulp.task('jscat', function(cb){
		pump([
			gulp.src(['src/public/js/jquery.min.js', 'src/public/js/client.js']),
			concatjs('bundle.js'),
			babel({
				presets: ['env']
			}),
			gulp.dest('dist/public/js')
		], cb)
	}
);
//concatjs, minify, transpile
gulp.task('jsall', function(cb){
		pump([
			gulp.src(['src/public/js/jquery.min.js', 'src/public/js/client.js']),
			babel({
				presets: ['env']
			}),
			concatjs('bundle.js'),
			uglify({
				mangle: {
					reserved: ['products', 'categories', 'currency', 'nonce1']
				}
			}),
			gulp.dest('dist/public/js'),
			gulp.src(['src/public/js/jquery.min.js', 'src/public/js/admin.js']),
			concatjs('adminbundle.js'),
			babel({
				presets: ['env']
			}),
			uglify({
				mangle: {
					reserved: ['pageNumber', 'currency', 'products', 'productID']
				}
			}),
			gulp.dest('dist/public/js')
		], cb)
	}
);*/
/*gulp.task('clientjs', function(cb){
	pump([
		gulp.src(['src/public/js/jquery.min.js', 'src/public/js/client.js']),
		concatjs('bundle.js'),
		babel({
			presets: ['env']
		}),
		/-uglify({
			mangle: {
				reserved: ['products', 'categories', 'currency', 'nonce1']
			}
		}),-/
		gulp.dest('dist/public/js')
	], cb)
});
gulp.task('jsfast', function(cb){
		pump([
			gulp.src(['src/public/js/jquery.min.js', 'src/public/js/client.js']),
			concatjs('bundle.js'),
			babel({
				presets: ['env']
			}),
			gulp.dest('dist/public/js')
		], cb)
	}
);
gulp.task('images', function(cb){
		pump([
		gulp.src('src/public/images/*.{jpg,png,svg}'),
		image({guetzli: false}),
		gulp.dest('dist/public/images')
		], cb)
	}
);gulp.task('default', ['main', 'bin', 'settings', 'admin', 'favicon', 'manifest', 'css', 'jsall', 'compile-pug']);//change js to jsmin in production

//buildfast shouldn't be used for production
gulp.task('buildfast2', ['main', 'bin', 'settings', 'admin', 'favicon', 'manifest']);
gulp.task('buildfast', ['main', 'bin', 'settings', 'admin', 'favicon', 'manifest', 'cssfast', 'jsfast', 'compile-pug-fast']);

gulp.task('buildall', ['compress-images', 'main', 'bin', 'settings', 'admin', 'favicon', 'manifest', 'css', 'jsall', 'compile-pug']);//change js to jsmin in production

gulp.task('default', ['main', 'bin', 'settings', 'admin', 'favicon', 'manifest', 'css', 'jsall', 'compile-pug']);//change js to jsmin in production

gulp.task('lint', function(cb){
		pump([
			gulp.src('dist/public/js/bundle.js'),
			jshint(),
			jshint.reporter('default', { verbose: true })
		], cb)
	}
);*/