# Web page for Scalathon.

The 2012 version of the page uses the following technologies:

* [Twitter Bootstrap][] (which, in turn, uses [Less][])
* [Node.js][] (if you customize Twitter Bootstrap)
* Ruby
* [Jekyll][]
* Rake
* [Sass][]
* [Bourbon][]

Twitter Bootstrap is already folded into the project, though it can be
customized and updated. Bourbon is also folded into the project, but you'll
need to install the gem. (See next step.)

## Before you build for the first time

First, install a version of Ruby 1.9. (I've been using 1.9.3, via _rvm_.) Then,
install the `bundler` gem:

    $ gem install bundler

Have `bundler` install everything else, courtesy of the `Gemfile` in this
directory:

    $ bundle install

### If you're planning to customize the Twitter Bootstrap package

If you're planning to customize Twitter Bootstrap, you'll need some additional
software. (If not, skip this section.)

Twitter Bootstrap uses [Less][], rather than [Sass][], for CSS. To customize
the Bootstrap styling, you must first install:

* [Node.js][]
* [npm][], the Node Package Manager
* [Less][]

##### Install node.js

First, install [Node.js][]. On Mac OS X, the easiest way to install it is
via [Homebrew][]:

    $ brew install node

If you're using Windows, use the MSI from the [Node.js][] home page.

On Linux and other Unix-like systems, it's easiest to build from source. You'll
need the usual build tools (GCC, Make, etc.).

    $ git clone https://github.com/joyent/node.git
    $ cd node
    $ ./configure --prefix $HOME/local # Choose your favorite prefix
    $ make
    $ make install

##### Install npm

Next, install the Node Package Manager. Easy instructions are on the
[npm][] web site.

##### Install LESS

Once npm is installed, installing LESS is trivial:

    $ npm install less

The binary will end up in `$HOME/node_modules/.bin`, so make sure that
directory is in your path.

## Building the Scalathon site

Use Rake. Don't invoke Jekyll directly, because there are other tasks to be
done, tasks that Jekyll can't do (especially on GitHub, where the web site is
hosted).

It's best to use `bundle exec` to run `rake` in a controlled environment (as
dictated by `Gemfile`):

    $ bundle exec rake

## To preview your changes

Run

    $ bundle exec rake preview

Then, surf to `localhost:4000`.

## Publishing

To publish the site to GitHub, *always* run Rake first. Here are the steps:

    $ bundle exec rake 
    $ git commit -m '...' -a
    $ git push origin gh-pages

## Styling

### To customize the look and feel (except for Twitter Bootstrap)

Customize `sass/styles.scss`. Then, rebuild the site. Note that this file
is a [Sass][] input file, so edit accordingly.

Note that Twitter Bootstrap is *not* controlled via `styles.scss`. There *are*
a few Bootstrap-specific rules in `style.scss`, though; these rules are marked,
and they are applied as overrides to Bootstrap styles. (They're in the Sass
file, for convenience and ease of use.)

[Sass]: http://sass-lang.com

### To customize the Twitter Bootstrap portion

Edit `bootstrap/less/custom.less`. See
<http://twitter.github.com/bootstrap/less.html> for a list of things you can
customize. Then, run:

    $ bundle exec rake bootstrap_css

to update the appropriate CSS files.

## Updating Twitter Bootstrap

To install a new copy of Twitter Bootstrap (e.g., to pick up some bug fixes),
run this Rake command:

    $ bundle exec rake bootstrap

That command will

* Clone the Twitter Bootstrap repo (the master) into a temporary directory.
* Copy the appropriate files from the cloned repo to the `./bootstrap` folder,
  if they've changed.
* Update all Bootstrap CSS files (via the `bootstrap_css` task).

It will *not touch* our `custom.less` file (which is good).

[Less]: http://lesscss.org/
[Twitter Bootstrap]: http://twitter.github.com/bootstrap/
[Bourbon]: http://thoughtbot.com/bourbon/
[Jekyll]: http://jekyllrb.com/
[Node.js]: http://nodejs.org/
[npm]: http://npmjs.org/
[Homebrew]: http://mxcl.github.com/homebrew/
