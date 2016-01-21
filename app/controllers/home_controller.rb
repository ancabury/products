class HomeController < ApplicationController
  def index
    if admin_signed_in?
      redirect_to product_index_url
    end

    @q = Product.ransack(params[:q])
  end

  def search
    @q = Product.ransack(params[:q])
    @products =   @q.result.paginate(page: params[:page], per_page: NUMBER_PER_PAGE)

    respond_to do |format|
      format.js { render json: { content: render_to_string(:partial => 'product_search'  ) }}
    end
  end
end
