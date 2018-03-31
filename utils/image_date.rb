require 'awesome_print'
require 'fastimage'

root_url = 'https://ceverett-io.nyc3.digitaloceanspaces.com/'

img_nums = (4092..4419)

img_nums.each do |img_num|

  img_url = "#{root_url}IMG_#{img_num}.jpg"

  width, height = FastImage.size(img_url)

  next if width.nil?

  if width > height
    puts "{ src: '#{img_url}', width: 3, height: 2 },"
  else
    puts "{ src: '#{img_url}', width: 2, height: 3 },"
  end
end



