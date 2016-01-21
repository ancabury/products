class CreateProducts < ActiveRecord::Migration
  def change
    create_table :products do |t|
      t.string :name
      t.string :description
      t.float :price
      t.string :manufacturer
      t.integer :quantity
      t.attachment :image

      t.timestamps null: false
    end
  end
end
