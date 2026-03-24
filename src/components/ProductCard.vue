<template>
  <Card class="w-full h-full group cursor-pointer">
    <template #content>
      <div class="flex flex-col h-full">

        <div class="w-full h-48 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl mb-6 flex items-center justify-center group-hover:from-blue-100 group-hover:to-purple-100 transition-all duration-300">
          <div class="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg">
            <i class="pi pi-box text-white text-3xl"></i>
          </div>
        </div>

 
        <div class="flex-1 mb-6">
          <div class="mb-3">
            <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mb-2">
              {{ product.category.name }}
            </span>
          </div>
          <h3 class="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-200">
            {{ product.name }}
          </h3>
          <p class="text-gray-600 text-sm leading-relaxed">
            Produto de alta qualidade da categoria {{ product.category.name.toLowerCase() }}
          </p>
        </div>


        <div class="flex items-center justify-between">
          <div class="flex flex-col">
            <span class="text-sm text-gray-500 line-through">R$ {{ (product.price.amount * 1.2).toFixed(2) }}</span>
            <span class="text-2xl font-bold text-green-600">R$ {{ product.price.amount }}</span>
            <span class="text-xs text-green-600 font-medium">17% OFF</span>
          </div>

          <Button
            label="Adicionar"
            icon="pi pi-plus"
            @click="addToCart"
            class="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 border-0"
          />
        </div>
      </div>
    </template>
  </Card>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import type { PropType } from "vue";
import type { ProductDTO } from "../domain/entities/Product.js";
import Card from "primevue/card";
import Button from "primevue/button";

export default defineComponent({
  components: {
    Card,
    Button,
  },
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