# Web page for Scalathon.

The 2012 version of the page uses the following technologies:

* [Twitter Bootstrap][]
* [Sass-Twitter-Bootstrap][], which contains [Sass][] ports of Twitter's
  [Less][] CSS files.
* [Sass][]
* Ruby
* [Jekyll][]
* Rake
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

### To customize the look and feel

Customize `sass/styles.scss`. Then, rebuild the site. Note that this file
is a [Sass][] input file, so edit accordingly.

Twitter Bootstrap customization is also controlled in `styles.scss`, courtesy
of [Sass-Twitter-Bootstrap][]. The Twitter Bootstrap LESS variables that are
documented on the  [Twitter Bootstrap][] web site are available as Sass
variables, inside `styles.scss`. For example, the LESS variable `@navbarHeight`
is `$navbarHeight`, inside the Sass file. The names are the same, but the
syntax is pure Sass.

## Updating Twitter Bootstrap and Sass-Twitter-Bootstrap

To update the installed files from Twitter Bootstrap and Sass-Twitter-Bootstrap
(e.g., to pick up some bug fixes), run this Rake command:

    $ bundle exec rake bootstrap

That command will

* Clone the Twitter Bootstrap repo (the master) into a temporary directory.
* Copy the appropriate files from the cloned repo to the `./bootstrap`
  directory, if they've changed.
* Compile all Bootstrap Javascript files into minified versions, storing the
  results in `./bootstrap/js`.
* Create `./_includes/bootstrap.js.html`, which pulls in the Bootstrap
  Javascript
* Clone the Sass-Twitter-Bootstrap repo into a temporary directory.
* Copy the appropriate Sass files from the cloned repo into the
  `./bootstrap/sass` directory.

It will *not touch* our `custom.less` file (which is good).

[Less]: http://lesscss.org/
[Twitter Bootstrap]: http://twitter.github.com/bootstrap/
[Bourbon]: http://thoughtbot.com/bourbon/
[Jekyll]: http://jekyllrb.com/
[Node.js]: http://nodejs.org/
[npm]: http://npmjs.org/
[Homebrew]: http://mxcl.github.com/homebrew/
[Sass-Twitter-Bootstrap]: https://github.com/jlong/sass-twitter-bootstrap
[Sass]: http://sass-lang.com
