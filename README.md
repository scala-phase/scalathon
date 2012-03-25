# Web page for Scalathon.

The 2012 version of the page uses the following technologies:

* [Twitter Bootstrap](http://twitter.github.com/bootstrap/) (which, in turn, uses Less.js)
* Node.js (if you customize Twitter Bootstrap)
* Ruby
* [Jekyll](http://jekyllrb.com/)
* Rake
* [Sass][]

Twitter Bootstrap is already folded into the project, though it can be
customized and updated.

## To build normally

First, install a version of Ruby, 1.8.7 or better. (I've been using 1.9.3, via
_rvm_.) Then, install the `bundler` gem:

    $ gem install bundler

Have `bundler` install everything else, courtesy of the `Gemfile` in this
directory:

    $ bundle install

Finally, build the site, using Rake. It's best to use `bundle exec` to run
`rake` in a controlled environment (as dictated by `Gemfile`):

    $ bundle exec rake

## To preview your changes

Run

    $ bundle exec rake preview

Then, surf to `localhost:4000`.

## Styling

### To customize the non-Twitter Bootstrap look and feel

Customize `sass/styles.scss`. Then, rebuild the site. Note that this file
is a [Sass][] input file, so edit accordingly.

[Sass]: http://sass-lang.com

### To customize the Twitter Bootstrap portion

Edit `bootstrap/less/custom.less`. See <http://twitter.github.com/bootstrap/less.html> for a list of things you can customize. Then, run:

    $ bundle exec rake bootstrap_css

to update the appropriate CSS files.

## Updating Twitter Bootstrap

To install a new copy of Twitter Bootstrap (e.g., to pick up some bug fixes),
run this Rake command:

    $ bundle exec rake bootstrap

That command will

* Clone the Twitter Bootstrap repo (the master)
* Install the appropriate files under `./bootstrap`, if they've changed.

It will *not* update our `custom.less` file (which is good).
