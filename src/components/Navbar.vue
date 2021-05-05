<template>
    <div>
        <Menubar class="navbar">
            <template #start>
                <h3>OBS-Control</h3>
            </template>
            <template #end>
                <Button
                    icon="pi pi-minus"
                    class="p-mr-2 p-button-warning p-button-text closebtn"
                    @click="minimize"
                />
                <Button
                    icon="pi pi-times"
                    class=" p-button-danger p-button-text closebtn"
                    @click="close"
                />
            </template>
        </Menubar>
    </div>
</template>

<script>
import { onMounted, ref } from 'vue'

export default {
    setup() {
        let close = () => {
            window.ipcRenderer.send('close')
        }
        let minimize = () => {
            window.ipcRenderer.send('minimize')
        }
        const items = ref([])
        onMounted(() => {})

        return { items, close, minimize }
    }
}
</script>

<style lang="scss">
.navbar {
    -webkit-app-region: drag;
    .closebtn {
        -webkit-app-region: no-drag;
        background-color: var(--pink-500);
    }
    ul {
        li {
            -webkit-app-region: no-drag;
        }
    }
}
</style>
