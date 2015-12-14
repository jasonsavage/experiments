#!/usr/bin/env ruby

# Summary:
# This utility will accept 2 photos and return the percent . 
# 

# Code Author: Jason Savage
#------------------------------------------

require 'chunky_png'

def run()
  
  return if ARGV.length < 2 
  
  # get dir argument
  imgA  = ChunkyPNG::Image.from_file(ARGV[0])
  imgB  = ChunkyPNG::Image.from_file(ARGV[1])
  
  diff = []

  imgA.height.times do |y|
    imgA.row(y).each_with_index do |pixel, x|
      
      begin
        diff << [x,y] unless pixel == imgB[x,y]
      rescue
        break
      end
    end
  end
  
  puts "pixels (total):     #{imgA.pixels.length}"
  puts "pixels changed:     #{diff.length}"
  puts "pixels changed (%): #{(diff.length.to_f / imgA.pixels.length) * 100}%"
  
  
end;





# run script
run if __FILE__ == 'photo_compare.rb'