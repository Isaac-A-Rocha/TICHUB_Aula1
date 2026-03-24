<template>
  <div class="product-card">
    <div class="product-info">
      <h3>{{ product.name }}</h3>
      <span class="category">{{ product.category.name }}</span>
    </div>

    <div class="product-footer">
      <span class="price">R$ {{ product.price.amount }}</span>
      <button @click="addToCart">Adicionar</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import type { PropType } from "vue";
import type { ProductDTO } from "../domain/entities/Product.js";

export default defineComponent({
  props: {
    product: {
      type: Object as PropType<ProductDTO>,
      required: true,
    },
  },

  emits: ["add-to-cart"],

  methods: {
    addToCart() {
      this.$emit("add-to-cart", this.product);
    },
  },
});
</script>

<style scoped>
.product-card {
  background: white;
  border-radius: 1rem;
  padding: 1.5rem;
  border: 1px solid #035ed6;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.05);
  transition: all 0.2s ease;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.product-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 18px rgba(0, 0, 0, 0.08);
}


.product-info {
  margin-bottom: 1rem;
}

.product-info h3 {
  font-size: 1.2rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 0.25rem;
}

.category {
  font-size: 0.8rem;
  color: #64748b;
}


.product-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.price {
  font-size: 1.2rem;
  font-weight: bold;
  color: #10b981;
}


button {
  background: #3b82f6;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  font-weight: 500;
  cursor: pointer;
  transition: 0.2s;
}

button:hover {
  background: #2563eb;
}

button:active {
  transform: scale(0.97);
}
</style>