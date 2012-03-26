require 'tmpdir'

# Set ENV['BOOTSTRAP_URL'] to the path of a local clone, if you want to use
# a local cloned repo of Twitter Bootstrap
BOOTSTRAP_URL = ENV['BOOTSTRAP_URL'] || 'https://github.com/twitter/bootstrap'
BOOTSTRAP_TEMP = File.join(Dir::tmpdir, Dir::Tmpname.make_tmpname('bootstrap', 'dir'))
BOOTSTRAP_SOURCE = File.join(BOOTSTRAP_TEMP, 'bootstrap')
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
task :css => :sass_bootstrap_defs do
  FileList['sass/[A-Za-z0-9]*.scss'].each do |scss|
    css = scss.gsub(/^sass/, 'css').gsub(/\.scss$/, '.css')
    Dir.mkdir('css') if !Dir.exists?('css')
    Dir.chdir('sass') do
      input = File.basename(scss)
      out = File.join('..', css)
      puts "#{scss} -> #{css}"
      sh 'sass', '-r', './bourbon/lib/bourbon.rb', input, out
    end
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
  :bootstrap_git, :bootstrap_js, :bootstrap_img, :bootstrap_css, :bootstrap_clean
]

desc "Rebuild the Twitter Bootstrap CSS files from their LESS inputs."
task :bootstrap_css do
  puts "Copying LESS files"
  Dir.glob(File.join(BOOTSTRAP_SOURCE, 'less', '*.less')).each do |source|
    target = File.join('bootstrap/less', File.basename(source))
    cp source, target if different?(source, target)
  end

  puts "Compiling #{BOOTSTRAP_CUSTOM_LESS}"
  sh 'lessc', '--compress', BOOTSTRAP_CUSTOM_LESS, 'bootstrap/css/bootstrap.min.css'
end

# Do not invooke this directly. It will fail.
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

# Do not invoke this directly.
task :bootstrap_git do
  Dir.mkdir(BOOTSTRAP_TEMP)
  Dir.chdir(BOOTSTRAP_TEMP) do
    puts "In #{BOOTSTRAP_TEMP}"
    sh 'git', 'clone', BOOTSTRAP_URL
  end
end

# Do not invoke this directly. It will fail.
task :bootstrap_clean do
  rm_r BOOTSTRAP_TEMP
end

# ----------------------------------------------------------------------------

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

