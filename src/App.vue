<template>
  <div class="app">
    <h1>E-commerce Vue</h1>

   
    <div class="products">
      <ProductCard
        v-for="product in products"
        :key="product.id"
        :product="product"
        @add-to-cart="addToCart"
      />
    </div>

    
    <div class="cart-summary">
      <h2>Carrinho</h2>

      <p>
        <span>Total de itens:</span>
        <span>{{ totalItems }}</span>
      </p>

      <p>
        <span>Preço Final:</span>
        <span>R$ {{ finalPrice }}</span>
      </p>

      <div v-if="cartItems.length > 0" class="cart-items">
        <h3>Itens no Carrinho:</h3>

        <ul>
          <li
            v-for="item in cartItems"
            :key="item.product.id"
            class="cart-item"
          >
            <div class="item-info">
              <strong>{{ item.product.name }}</strong>
              <span>x {{ item.quantity }}</span>
            </div>

            <div class="item-actions">
              <button
                class="btn-warning"
                @click="removeOne(item.product.id)"
              >
                -1
              </button>

              <button
                class="btn-danger"
                @click="removeAll(item.product.id)"
              >
                Remover
              </button>
            </div>
          </li>
        </ul>
      </div>
    </div>
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

export default defineComponent({
  components: {
    ProductCard,
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
  },
});
</script>

<style scoped>
.app {
  /* Definição de variáveis no escopo principal para melhor compatibilidade */
  --primary-color: #3b82f6;
  --primary-hover: #2563eb;
  --success-color: #10b981;
  --danger-color: #ef4444;
  --danger-hover: #dc2626;
  --warning-color: #f59e0b;
  --warning-hover: #d97706;
  
  --bg-main: #f8fafc;
  --bg-card: #ffffff;
  --text-primary: #0f172a;
  --text-secondary: #64748b;
  --border-color: #e2e8f0;
  
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  --radius: 1rem;

  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family: system-ui, -apple-system, sans-serif;
  color: var(--text-primary);
}

h1 {
  text-align: center;
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 3rem;
  color: var(--text-primary);
}

.products {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

/* --- Resumo do Carrinho --- */
.cart-summary {
  margin-top: 4rem;
  background: var(--bg-card);
  padding: 2rem;
  border-radius: var(--radius);
  box-shadow: var(--shadow-md);
  border: 1px solid var(--border-color);
}

.cart-summary h2 {
  margin-top: 0;
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
  color: var(--text-primary);
  border-bottom: 2px solid var(--border-color);
  padding-bottom: 0.75rem;
}

.cart-summary p {
  display: flex;
  justify-content: space-between;
  margin: 0.75rem 0;
  font-weight: 500;
  color: var(--text-secondary);
}

.cart-summary p:last-of-type {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--success-color);
  border-top: 1px dashed var(--border-color);
  padding-top: 1rem;
  margin-top: 1rem;
}

/* --- Lista de Itens --- */
.cart-items {
  margin-top: 2.5rem;
}

.cart-items h3 {
  font-size: 1.1rem;
  margin-bottom: 1rem;
  color: var(--text-primary);
}

.cart-items ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.cart-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.25rem;
  background: var(--bg-main);
  border: 1px solid var(--border-color);
  border-radius: 0.75rem;
  transition: all 0.2s ease-in-out;
}

.cart-item:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-sm);
  border-color: #cbd5e1;
}

.item-info {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.item-info strong {
  font-size: 1.1rem;
  color: var(--text-primary);
}

.item-info span {
  font-size: 0.9rem;
  color: var(--text-secondary);
}

/* --- Botões --- */
.item-actions {
  display: flex;
  gap: 0.5rem;
}

button {
  border: none;
  padding: 0.5rem 1rem;
  font-weight: 600;
  font-size: 0.875rem;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: background-color 0.2s, transform 0.1s;
}

button:active {
  transform: scale(0.96);
}

.btn-warning {
  background: var(--warning-color);
  color: #fff;
}

.btn-warning:hover {
  background: var(--warning-hover);
}

.btn-danger {
  background: var(--danger-color);
  color: #fff;
}

.btn-danger:hover {
  background: var(--danger-hover);
}
</style>