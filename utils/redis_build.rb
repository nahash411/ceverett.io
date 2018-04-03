require 'redis'
require 'awesome_print'
require 'fastimage'
require 'json'

redis = Redis.new

root_url = 'https://ceverett-io.nyc3.digitaloceanspaces.com/'

img_nums = (4092..5315)

img_nums.each do |img_num|

  img_url = "#{root_url}IMG_#{img_num}.jpg"

  width, height = FastImage.size(img_url)

  next if width.nil?

  if width > height
    width = 3
    height = 2
  else
    width = 2
    height = 3
  end

  redis.hmset("image:#{img_num}", "src", img_url, "width", width, "height", height)
  redis.sadd("image:#{img_num}:categories", 'uncategorized')

  puts "Set image data successful for #{img_num}"

end

redis.sadd("categories", 'uncategorized')



redis.keys("image:*").each do |key|
  redis.del(key)
end



img_nums.each do |img_num|

  img_url = "#{root_url}IMG_#{img_num}.jpg"

  width, height = FastImage.size(img_url)

  next if width.nil?

  if width > height
    width = 3
    height = 2
  else
    width = 2
    height = 3
  end

  redis.del("image:#{img_num}height:")
  redis.set("image:#{img_num}:height", height)

  puts "Set image data successful for #{img_num}"

end
