# Web page for Scalathon.

To build:

First, install a version of Ruby, 1.8.7 or better. (I've been using 1.9.3, via
_rvm_.) Then, install the `bundler` gem:

    $ gem install bundler

Have `bundler` install everything else, courtesy of the `Gemfile` in this
directory:

    $ bundle install

Finally, run Jekyll. It's best to use `bundle exec` to run `jekyll` in a
controlled environment (as dictated by `Gemfile`):

    $ bundle exec jekyll
