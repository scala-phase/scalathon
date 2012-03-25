task :default => :jekyll

task :jekyll => [:css]

task :css do
  require 'sass'

  FileList['sass/*.scss'].each do |scss|
    css = scss.gsub(/^sass/, 'css').gsub(/\.scss$/, '.css')
    Dir.mkdir('css') if !Dir.exists?('css')
    Dir.chdir('sass') do
      input = File.basename(scss)
      engine = Sass::Engine.new(File.open(input).readlines.join(''),
                                :syntax => :scss)
      out = File.open(File.join('..', css), 'w')
      puts "#{scss} -> #{css}"
      out.write("/* AUTOMATICALLY GENERATED FROM #{input} on #{Time.now} */\n")
      out.write(engine.render)
      # Force close, to force a flush.
      out.close
    end
  end
end
