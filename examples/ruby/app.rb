require 'sinatra'
require 'json'

set :port, 4567
set :bind, '0.0.0.0'

get '/' do
  content_type :json
  { message: 'Hello from Ruby Example', version: '1.0.0' }.to_json
end

get '/health' do
  content_type :json
  { status: 'healthy' }.to_json
end

puts "Ruby Sinatra Example starting on port 4567..."
