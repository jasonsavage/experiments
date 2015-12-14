#!/usr/bin/env ruby

# Summary:
# This utility will accept a html file and output a css stylesheet based on all the ids & class that are found. 

# Code Author: Jason Savage
#------------------------------------------



def run()
  
  pattern = Regexp.new(/class="[^"]*"/)
  
  # open in html file
  contents = ''

  File.open('test_stress.html', "r").each do |line|
    contents << line.strip
  end
  
  # remove extra whitespaces
  contents.gsub!(/[\s\t\r][\s\t\r]*/, " ")
  
  # extract body content
  # contents = contents.match('<body>([^`]*?)<\/body>').to_s
  

  #parse out all the class attrs
  class_attrs = contents.scan(/class="([^"]*)"/)
  
  # build an hash for each row in array
  class_map = []
  class_attrs.each do |row|
    
    row = row[0]
    
    sub = row.split
    parts = ''
    sub.each do |s|
      parts += '.' + s
      class_map << parts
    end

    
  end
  
  # get rid of duplicate class nodes
  class_map.uniq!

  
  class_body = " \\n{\\n}\\n\\n".gsub(/\\n/, "\n")
  
  # save css file
  File.open('test_page.css', "w") do |io|
      io.write( class_map.join(class_body) + class_body )
  end
  
end;



# run script
run if __FILE__ == 'css_class_builder.rb'



