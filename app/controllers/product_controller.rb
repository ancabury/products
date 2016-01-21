class ProductController < ApplicationController
  before_filter :current_product, except: [:index, :new, :create, :popularity]

  def index
    @products = Product.all.paginate(page: params[:page], per_page: NUMBER_PER_PAGE)
  end

  def new
    @product = Product.new
  end

  def create
    @product = Product.new(product_params)
    if @product.save
      redirect_to product_index_path, flash: { success: "Product created successfully !" }
    else
      render :action => 'new'
    end
  end

  def edit
  end

  def update
    if @product.update_attributes(product_params)
      redirect_to product_index_url, flash: { success: "Product updated successfully !" }
    else
      render 'edit'
    end
  end

  def destroy
    @product.destroy
    redirect_to product_index_path, flash: { success: "Product deleted successfully !" }
  end

  def popularity
    prod = Product.find(params[:product_id])
    prod.popularities.create

    @popularity = prod.popularities
    respond_to do |format|
      format.js { render json: {content: render_to_string(:partial => 'popularity'  ) }}
    end
  end

  private

  def current_product
    @product = Product.find(params[:id])
  end

  def product_params
    params.require(:product).permit(:name, :description, :price, :manufacturer, :quantity, :image)
  end
end
