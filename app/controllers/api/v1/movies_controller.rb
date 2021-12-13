class Api::V1::MoviesController < ApplicationController
  def index
    uri = URI('https://api.themoviedb.org/3/movie/now_playing')
    params = { api_key: ENV['MOVIES_DB_API_KEY'] }
    uri.query = URI.encode_www_form(params)
    res = Net::HTTP.get_response(uri)

    render json: JSON.parse(res.body)['results']
  end
end
