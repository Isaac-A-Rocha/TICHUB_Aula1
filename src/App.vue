<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
    <header class="bg-white shadow-lg border-b border-gray-100">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-3">
            <div class="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
              <i class="pi pi-shopping-bag text-white text-lg"></i>
            </div>
            <h1 class="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              E-commerce Vue
            </h1>
          </div>
          <div class="flex items-center space-x-4">
            <div class="flex items-center space-x-2 bg-blue-50 px-4 py-2 rounded-full">
              <i class="pi pi-shopping-cart text-blue-600"></i>
              <span class="font-semibold text-blue-600">{{ totalItems }}</span>
            </div>
          </div>
        </div>
      </div>
    </header>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <section class="mb-16">
        <div class="text-center mb-12">
          <h2 class="text-2xl font-bold text-gray-900 mb-2">Produtos em Destaque</h2>
          <p class="text-gray-600">Descubra nossa seleção especial de produtos</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          <ProductCard
            v-for="product in products"
            :key="product.id"
            :product="product"
            @add-to-cart="addToCart"
            class="transform hover:scale-105 transition-transform duration-300"
          />
        </div>
      </section>

      
      <section class="bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div class="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-6">
          <h2 class="text-2xl font-bold text-white flex items-center">
            <i class="pi pi-shopping-cart mr-3"></i>
            Seu Carrinho
          </h2>
        </div>

        <div class="p-8">
        
          <div class="bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-6 mb-8 border border-gray-100">
            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div class="flex items-center space-x-3">
                <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <i class="pi pi-box text-blue-600 text-xl"></i>
                </div>
                <div>
                  <p class="text-sm text-gray-600">Total de itens</p>
                  <p class="text-2xl font-bold text-gray-900">{{ totalItems }}</p>
                </div>
              </div>
              <div class="flex items-center space-x-3">
                <div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <i class="pi pi-dollar text-green-600 text-xl"></i>
                </div>
                <div>
                  <p class="text-sm text-gray-600">Valor total</p>
                  <p class="text-3xl font-bold text-green-600">R$ {{ finalPrice }}</p>
                </div>
              </div>
            </div>
          </div>

          
          <div v-if="cartItems.length === 0" class="text-center py-16">
            <div class="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <i class="pi pi-shopping-cart text-4xl text-gray-400"></i>
            </div>
            <h3 class="text-2xl font-semibold text-gray-700 mb-3">Seu carrinho está vazio</h3>
            <p class="text-gray-500 mb-6 max-w-md mx-auto">Adicione alguns produtos incríveis para começar suas compras!</p>
            <div class="inline-flex items-center px-4 py-2 bg-blue-50 text-blue-600 rounded-full">
              <i class="pi pi-arrow-up mr-2"></i>
              Escolha seus produtos acima
            </div>
          </div>

          <DataView v-else :value="cartItems" layout="list" class="border-0">
            <template #list="slotProps">
              <div class="space-y-4">
                <div
                  v-for="item in slotProps.items"
                  :key="item.product.id"
                  class="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg hover:border-blue-200 transition-all duration-200"
                >
                  <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                    <div class="flex-1">
                      <div class="flex items-start space-x-4">
                        <div class="w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                          <i class="pi pi-box text-blue-600 text-xl"></i>
                        </div>
                        <div class="flex-1 min-w-0">
                          <h4 class="text-lg font-semibold text-gray-900 mb-1">{{ item.product.name }}</h4>
                          <p class="text-sm text-gray-500 mb-2">{{ item.product.category.name }}</p>
                          <div class="flex items-center space-x-4">
                            <span class="text-sm text-gray-600">Preço unitário:</span>
                            <span class="font-medium text-gray-900">R$ {{ item.product.price.amount }}</span>
                          </div>
                          <div class="flex items-center space-x-4 mt-1">
                            <span class="text-sm text-gray-600">Subtotal:</span>
                            <span class="font-bold text-green-600">R$ {{ (item.product.price.amount * item.quantity).toFixed(2) }}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="flex items-center justify-between lg:justify-end space-x-4">
                        <div class="flex items-center space-x-3">
                            <label class="text-sm font-medium text-gray-700">Quantidade:</label>
                            <InputNumber
                            v-model="item.quantity"
                            :min="1"
                            :max="99"
                            @update:modelValue="updateQuantity(item.product.id, $event)"
                            class="w-20"
                            inputClass="w-full text-center border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                            showButtons
                            />
                        </div>

                        <div class="flex space-x-2">
                            <Button
                            icon="pi pi-minus"
                            severity="warning"
                            @click="removeOne(item.product.id)"
                            class="p-2 w-10 h-10 rounded-lg hover:bg-orange-50 hover:border-orange-200 transition-colors"
                            outlined
                            />

                            <Button
                            icon="pi pi-trash"
                            severity="danger"
                            @click="confirmRemoveAll(item.product.id)"
                            class="p-2 w-10 h-10 rounded-lg hover:bg-red-50 hover:border-red-200 transition-colors"
                            outlined
                            />
                        </div>                    
                    
                    </div>
                  </div>
                </div>
              </div>
            </template>
          </DataView>
        </div>
      </section>
    </div>

    <ConfirmDialog />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ProductCard from "./components/ProductCard.vue";
import { Product } from "./domain/entities/Product.js";
import type { ProductDTO } from "./domain/entities/Product.js";
import { Money } from "./domain/value-objects/Money.js";
import { Cart } from "./domain/entities/Cart.js";
import type { CartItem } from "./domain/entities/Cart.js";
import DataView from "primevue/dataview";
import InputNumber from "primevue/inputnumber";
import Button from "primevue/button";
import ConfirmDialog from "primevue/confirmdialog";

export default defineComponent({
  components: {
    ProductCard,
    DataView,
    InputNumber,
    Button,
    ConfirmDialog,
  },

  data(): { products: ProductDTO[]; cart: Cart } {
    return {
      products: [
        new Product(1, "Cimento", Money.create(50), {
          id: 1,
          name: "Construção",
        }),
        new Product(2, "Tijolo", Money.create(2), {
          id: 1,
          name: "Construção",
        }),
        new Product(3, "Martelo", Money.create(25), {
          id: 2,
          name: "Ferramentas",
        }),
      ],

      cart: new Cart(),
    };
  },

  computed: {
    totalItems(): number {
      return this.cart.getTotalItems();
    },

    finalPrice(): number {
      return this.cart.getFinalPrice().amount;
    },

    cartItems(): CartItem[] {
      return this.cart.getItems();
    },
  },

  methods: {
    addToCart(product: Product) {
      this.cart = this.cart.addItem(product, 1);
    },

    removeOne(productId: number) {
      this.cart = this.cart.removeItem(productId, 1);
    },

    removeAll(productId: number) {
      this.cart = this.cart.removeAll(productId);
    },

    updateQuantity(productId: number, newQuantity: number) {
      const currentItem = this.cartItems.find(item => item.product.id === productId);
      if (currentItem) {
        const diff = newQuantity - currentItem.quantity;
        if (diff > 0) {
          this.cart = this.cart.addItem(currentItem.product, diff);
        } else if (diff < 0) {
          this.cart = this.cart.removeItem(productId, Math.abs(diff));
        }
      }
    },

    confirmRemoveAll(productId: number) {
      const product = this.cartItems.find(item => item.product.id === productId)?.product;
      if (product) {
        (this as any).$confirm.require({
          message: `Tem certeza que deseja remover "${product.name}" do carrinho?`,
          header: 'Confirmar Remoção',
          icon: 'pi pi-exclamation-triangle',
          acceptLabel: 'Sim',
          rejectLabel: 'Não',
          accept: () => {
            this.removeAll(productId);
          }
        });
      }
    },
  },
});
</script>

