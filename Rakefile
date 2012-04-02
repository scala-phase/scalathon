require 'tmpdir'

TWITTER_BOOTSTRAP_MASTER = 'https://github.com/twitter/bootstrap'
SASS_TWITTER_BOOTSTRAP_MASTER = 'https://github.com/jlong/sass-twitter-bootstrap'

# Set ENV['BOOTSTRAP_URL'] to the path of a local clone, if you want to use
# a local cloned repo of Twitter Bootstrap

BOOTSTRAP_URL = ENV['BOOTSTRAP_URL'] || TWITTER_BOOTSTRAP_MASTER
# Ditto
SASS_BOOTSTRAP_URL = ENV['SASS_BOOTSTRAP_URL'] || SASS_TWITTER_BOOTSTRAP_MASTER

def tmpdir(prefix)
  File.join(Dir::tmpdir, Dir::Tmpname.make_tmpname(prefix, 'dir'))
end

GIT_TEMP = tmpdir('git-scalathon')

BOOTSTRAP_SUBDIR = 'bootstrap'
BOOTSTRAP_SOURCE = File.join(GIT_TEMP, BOOTSTRAP_SUBDIR)

SASS_BOOTSTRAP_SUBDIR = 'sass-twitter-bootstrap'
SASS_BOOTSTRAP_SOURCE = File.join(GIT_TEMP, SASS_BOOTSTRAP_SUBDIR)

BOOTSTRAP_CUSTOM_LESS = 'bootstrap/less/custom.less'
SASS_VARS = 'sass/_vars.scss'

task :default => :jekyll

desc "Build the site"
task :jekyll => [:css] do |t|
  sh 'jekyll'
end

desc "Build the site and run the local previewer on port 4000"
task :preview => [:css] do |t|
  sh 'jekyll', '--server'
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

desc "Extract the variables from custom.less into defs.scss, for sharing"
task :sass_bootstrap_defs do
  puts "#{BOOTSTRAP_CUSTOM_LESS} -> #{SASS_VARS}"
  vars = []
  File.open(BOOTSTRAP_CUSTOM_LESS) do |f|
    f.each_line do |l|
      l = l.chomp
      if l =~ /^@(.)([^:]+)(:.*)$/
        vars << "$bootstrap#{$1.upcase}#{$2}#{$3}"
      end
    end
  end

  File.open(SASS_VARS, 'w') do |f|
    f.write("// AUTOMATICALLY GENERATED FROM #{BOOTSTRAP_CUSTOM_LESS}\n")
    f.write("// DO NOT EDIT!\n")
    vars.each {|line| f.write("#{line}\n")}
  end
end

# For Twitter Bootstrap. Requires git and lessc (and node.js)

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

def git_clone(url, parent_dir, child_dir)
  FileUtils.mkdir_p parent_dir
  Dir.chdir(parent_dir) do
    puts "In #{parent_dir}"
    sh 'git', 'clone', url, child_dir
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

