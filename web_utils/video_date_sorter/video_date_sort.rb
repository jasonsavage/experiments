#!/usr/bin/env ruby

# Summary:
# This utility will take each video file in the specified directory, including sub-directories, and 
# copy it to the specified output directory (optional) for the year and month the video was taken/created. 
# (example:  ./unsorted/video.mov -> ./sorted/2013/10/video.mov)
# 
# Code Author: Jason Savage
#------------------------------------------

require 'exifr'
require 'fileutils'

def run()
  
  return if ARGV.length < 1
  
  # get dir argument
  in_dir  = ARGV[0]
  out_dir = ARGV[1] || in_dir
  
  # fix path if on windows
  in_dir = in_dir.gsub(%r{\\}) { "/" }
  out_dir = out_dir.gsub(%r{\\}) { "/" }
  
  puts 'in: ' + in_dir, 'out: ' + out_dir
  
  if Dir.exist? in_dir
    
    # loop through each *.mov, *.avi,*.3g2, *.mp4, *.m4v, *.flv in the folder and move to dir/#{year}/
    Dir.glob( in_dir + '/**/*.{mov,avi,3g2,mp4,m4v,flv,wmv}') do |file|
      
      move_file(out_dir, file)
      
    end
    
  end
  
end;

def move_file(dir, file)
  
  date_time = EXIFR::JPEG.new(file).date_time || File.mtime( file )
  
  if date_time != nil && date_time.year != ''
    
    # get path as #{dir}/year/month
    out_dir = File.join(dir, date_time.year.to_s, zero_pad(date_time.month.to_s))
    
    # create #{dir}/year/month if it doesn't exist?
    FileUtils.mkdir_p out_dir unless Dir.exist?(out_dir)
    
    # check if image file name is already used
    i     = 1
    ext   = File.extname(file)
    fname = File.basename(file, ext)
    
    while File.exist? File.join(out_dir, fname + ext) 
      fname = File.basename(file, ext) + '_' + i.to_s
      i += 1
    end
    
    # move file to new directory
    FileUtils.cp( file, File.join(out_dir, fname + ext) )
    
  end
  
end


def zero_pad(str)
  
  if str.to_f < 10
    return '0' + str
  end
  return str
  
end



# run script
run if __FILE__ == 'photo_date_sort.rb'