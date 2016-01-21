class Popularity < ActiveRecord::Base
  has_one :product, dependent: :destroy
end
