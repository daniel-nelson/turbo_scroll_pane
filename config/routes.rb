Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root to: redirect('/a_page')
  get :a_page, to: 'pages#a_page'
  get :a_pane, to: 'panes#a_pane'
end
