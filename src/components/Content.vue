<template>
    <div class="content p-p-4">
        <Scenes />
    </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import globals from '../globals'

import Scenes from './Scenes.vue'
export default {
    components: {
        Scenes
    },
    setup() {
        return {
            globals
        }
    }
}
</script>

<style lang="scss">
.content {
}
.select-buttons {
    display: flex;
    flex-direction: column;
    .select-button {
    }
}
.p-card {
    background-color: var(--bluegray-800);
    padding: -20px;
}
</style>
