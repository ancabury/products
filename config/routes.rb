Rails.application.routes.draw do
  devise_for :admins
  root to: 'home#index'
  resources :product do
    get 'popularity'
  end
  get 'search', to: 'home#search'
end
