<template>
    <div class="all">
        <NavBar />
        <Content v-if="loaded && !loading" />
        <Button @click="connect()" v-if="!loaded && !loading">Reload</Button>
        <ProgressSpinner v-if="loading" />
    </div>
</template>

<script>
import NavBar from './components/Navbar'
import Content from './components/Content'
import { ref } from 'vue'
import obs from './obs'
import midi from './midiController'

export default {
    components: { NavBar, Content },
    setup() {
        let loaded = ref(false)
        let loading = ref(true)
        function connect() {
            loading.value = true
            obs.connect({ address: 'localhost:4444' })
                .then(() => {
                    loaded.value = true
                    loading.value = false
                })
                .catch(() => {
                    loaded.value = false
                    loading.value = false
                    alert(
                        `You need to open OBS in order to control it ¯\\_(ツ)_/¯`
                    )
                })
        }
        connect()
        return { loaded, connect, loading }
    }
}
</script>

<style lang="scss">
* {
    margin: 0px;
    padding: 0px;
}
body {
    width: 100%;
    height: 100%;
    background-color: var(--bluegray-900);
}
html {
    width: 100%;
    height: 100%;
}
#app {
    width: 100%;
    height: 100%;
    .all {
        width: 100%;
        height: 100%;
    }
}
.box {
    background-color: var(--surface-e);
    text-align: center;
    padding-top: 1rem;
    padding-bottom: 1rem;
    border-radius: 4px;
    box-shadow: 0 2px 1px -1px rgba(0, 0, 0, 0.2),
        0 1px 1px 0 rgba(0, 0, 0, 0.14), 0 1px 3px 0 rgba(0, 0, 0, 0.12);
}
</style>
