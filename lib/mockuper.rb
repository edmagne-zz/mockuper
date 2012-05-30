class Mockuper
  require "fileutils"
  def self.create_source(name, defaults_dir)
    FileUtils.cp_r(defaults_dir, name)
  end
  
  def self.add_template(source_path, template, templates_dir)
    begin
      FileUtils.cp("#{templates_dir}/#{template}.html", source_path)
    rescue
      puts "you must type a valid mockup path"
    end
  end
  
end