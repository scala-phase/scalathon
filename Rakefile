# Build the Scalathon web site
# ---------------------------------------------------------------------------

require 'tmpdir'
require 'git'

# ---------------------------------------------------------------------------
# Functions used outside tasks
# ---------------------------------------------------------------------------

def tmpdir(prefix)
  File.join(Dir::tmpdir, Dir::Tmpname.make_tmpname(prefix, 'dir'))
end

# ---------------------------------------------------------------------------
# Constants
# ---------------------------------------------------------------------------

TWITTER_BOOTSTRAP_MASTER = 'https://github.com/twitter/bootstrap'
SASS_TWITTER_BOOTSTRAP_MASTER = 'https://github.com/jlong/sass-twitter-bootstrap'

# Set ENV['BOOTSTRAP_URL'] to the path of a local clone, if you want to use
# a local cloned repo of Twitter Bootstrap

BOOTSTRAP_URL = ENV['BOOTSTRAP_URL'] || TWITTER_BOOTSTRAP_MASTER
# Ditto
SASS_BOOTSTRAP_URL = ENV['SASS_BOOTSTRAP_URL'] || SASS_TWITTER_BOOTSTRAP_MASTER

GIT_TEMP = tmpdir('git-scalathon')

BOOTSTRAP_SUBDIR = 'bootstrap'
BOOTSTRAP_SOURCE = File.join(GIT_TEMP, BOOTSTRAP_SUBDIR)

SASS_BOOTSTRAP_SUBDIR = 'sass-twitter-bootstrap'
SASS_BOOTSTRAP_SOURCE = File.join(GIT_TEMP, SASS_BOOTSTRAP_SUBDIR)

TOP = File.dirname(__FILE__)

# ---------------------------------------------------------------------------
# Tasks
# ---------------------------------------------------------------------------

task :default => :jekyll

desc "Build the site"
task :jekyll => [:last_updated, :css] do |t|
  sh 'jekyll'
end

desc "Alias for 'jekyll' task"
task :generate => :jekyll

desc "Build the site and run the local previewer on port 4000"
task :preview => [:generate, :css] do |t|
  sh 'jekyll', '--server'
end

desc "Generate the last-updated content"
task :last_updated do
  now = Time.now
  File.open(File.join(TOP, "_includes", "last-updated-2012.html"), "wb") do |f|
    f.write <<-END1
<span class="date">Site last updated #{now.strftime("%d %B, %Y at %H:%M")}</span>
    END1
  end

  # The same, only for HTTP.
  File.open(File.join(TOP, "_includes", "last-modified-header.html"), 'wb') do |f|
    f.write <<-END2
<meta http-equiv="Last-Modified" content="#{now.utc.strftime("%a, %d %b %Y %H:%M:%S GMT")}">
    END2
  end
end

desc "Generate CSS from Sass input"
task :css do
  FileList['sass/[A-Za-z0-9]*.scss'].each do |scss|
    css = scss.gsub(/^sass/, 'css').gsub(/\.scss$/, '.css')
    Dir.mkdir('css') if !Dir.exists?('css')
    puts "#{scss} -> #{css}"
    sh 'sass', '-r', './sass/bourbon/lib/bourbon.rb', scss, css
  end
end

# For Twitter Bootstrap. Requires git.

desc "Build (or rebuild) the Twitter Bootstrap stuff."
task :bootstrap => [
  :bootstrap_git, :bootstrap_js, :bootstrap_img, :bootstrap_sass, :bootstrap_clean
]

desc "Get the sass-twitter-bootstrap Sass files"
task :bootstrap_sass do
  git_clone SASS_BOOTSTRAP_URL, GIT_TEMP, SASS_BOOTSTRAP_SUBDIR
  puts "Copying Sass files"
  target_dir = File.join('bootstrap', 'sass')
  FileUtils.mkdir_p target_dir
  Dir.glob(File.join(SASS_BOOTSTRAP_SOURCE, 'lib', '*.scss')).each do |source|
    target = File.join(target_dir, File.basename(source))
    cp source, target if different?(source, target)
  end
end

# Do not invoke this directly. It will fail.
task :bootstrap_js do
  require 'uglifier'
  require 'erb'

  template = ERB.new %q{
  <!-- AUTOMATICALLY GENERATED. DO NOT EDIT. -->
  <% paths.each do |path| %>
  <script type="text/javascript" src="/bootstrap/js/<%= path %>"></script>
  <% end %>
  }

  paths = []
  minifier = Uglifier.new
  Dir.glob(File.join(BOOTSTRAP_SOURCE, 'js', '*.js')).each do |source|
    base = File.basename(source).sub(/^(.*)\.js$/, '\1.min.js')
    paths << base
    target = File.join('bootstrap/js', base)
    if different?(source, target)
      File.open(target, 'w') do |out|
        out.write minifier.compile(File.read(source))
      end
    end
  end

  File.open('_includes/bootstrap.js.html', 'w') do |f|
    f.write template.result(binding)
  end
end

# Do not invoke this directly. It will fail.
task :bootstrap_img do
  Dir.glob(File.join(BOOTSTRAP_SOURCE, 'img', '*')).each do |img|
    target = File.join('bootstrap/img', File.basename(img))    
    cp img, target if different?(img, target)
  end
end

# Do not invoke this directly. It will fail.
task :bootstrap_clean do
  rm_r GIT_TEMP
end

task :bootstrap_git do
  git_clone BOOTSTRAP_URL, GIT_TEMP, BOOTSTRAP_SUBDIR
end

# ----------------------------------------------------------------------------
# Functions used within tasks
# ---------------------------------------------------------------------------

def git_clone(url, parent_dir, child_dir)
  FileUtils.mkdir_p parent_dir
  Dir.chdir(parent_dir) do
    puts "In #{parent_dir}:\n    Cloning #{url}"
    Git.clone(url, child_dir)
  end
end

def different?(path1, path2)
  require 'digest/md5'

  if File.exist?(path1) && File.exist?(path2)
    path1_md5 = Digest::MD5.hexdigest(File.read path1)
    path2_md5 = Digest::MD5.hexdigest(File.read path2)
    (path2_md5 != path1_md5)
  else
     true
  end
end

