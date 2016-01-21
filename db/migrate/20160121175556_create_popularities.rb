class CreatePopularities < ActiveRecord::Migration
  def change
    create_table :popularities do |t|
      t.integer :product_id
      t.integer :popularity, default: 1

      t.timestamps null: false
    end
  end
end
