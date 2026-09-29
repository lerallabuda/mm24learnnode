```vue
<script setup>
import { ref } from 'vue';
import BuildingButton from '../components/BuildingButton.vue';

let cookies = ref(0);
let cps = ref(0);
let clickPower = ref(1);

let buildings = ref([
    {name: 'Cursor', icon: '👆🏻', cps: 0.1, price: 15, count: 0},
    {name: 'Grandma', icon: '👵🏻', cps: 1, price: 100, count: 0},
    {name: 'Farm', icon: '🚜', cps: 8, price: 500, count: 0},
    {name: 'Mine', icon: '⛏️', cps: 47, price: 1000, count: 0},
    {name: 'Factory', icon: '🏭', cps: 200, price: 5000, count: 0},
]);

let upgrades = ref([
    {name: 'Better Clicking', description: '+1 cookie per click', power: 1, price: 50, bought: false},
    {name: 'Golden Clicking', description: '+5 cookies per click', power: 5, price: 250, bought: false},
]);

setInterval(() => {
    cookies.value += cps.value;
}, 1000);

function buyBuilding(building) {
    if (cookies.value >= building.price) {
        cookies.value -= building.price;
        cps.value += building.cps;
        building.count++;

        if (building.count % 10 === 0) {
            building.price = Math.ceil(building.price * 1.5);
        }
    }
}

function buyUpgrade(upgrade) {
    if (cookies.value >= upgrade.price && !upgrade.bought) {
        cookies.value -= upgrade.price;
        clickPower.value += upgrade.power;
        upgrade.bought = true;
    }
}
</script>

<template>
    <div class="columns">
        <div class="column has-background-primary has-text-centered">
            <h1>{{ parseFloat(cookies.toFixed(1)) }} cookies!</h1>
            <h3>per second {{ parseFloat(cps.toFixed(1)) }}</h3>
            <h3>per click {{ clickPower }}</h3>

            <div @click="cookies += clickPower">
                <img
                    src="https://png.pngtree.com/png-vector/20250425/ourmid/pngtree-chocolate-chip-cookie-icon-white-background-png-image_16100260.png"
                >
            </div>
        </div>

        <div class="column has-background-warning">
            <h2>Upgrades</h2>

            <div
                v-for="upgrade in upgrades"
                :key="upgrade.name"
                class="box"
            >
                <h3>{{ upgrade.name }}</h3>
                <p>{{ upgrade.description }}</p>
                <p>Price: {{ upgrade.price }} cookies</p>

                <button
                    class="button"
                    :disabled="cookies < upgrade.price || upgrade.bought"
                    @click="buyUpgrade(upgrade)"
                >
                    {{ upgrade.bought ? 'Purchased' : 'Buy Upgrade' }}
                </button>
            </div>
        </div>

        <div class="column has-background-info">
            <BuildingButton
                v-for="building in buildings"
                :key="building.name"
                :building="building"
                :disabled="cookies < building.price"
                @click="buyBuilding(building)"
            />
        </div>
    </div>
</template>
```
