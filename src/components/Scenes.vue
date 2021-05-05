<template>
    <Fieldset toggleable>
        <template #legend>
            Scenes
        </template>
        <div class="box " v-for="scene in scenes" :key="scene.idx">
            <RadioButton
                :style="{ verticalAlign: 'middle' }"
                :value="scene.name"
                v-model="selectedScene"
                class="p-mr-3"
            />
            <InputText type="text" :value="scene.name" disabled />
            <i class="pi pi-arrow-right"></i>
            <InputText type="text" :value="scene.keyDisplay" disabled />
        </div>
        <Button @click="saveScenes()">Save</Button>
    </Fieldset>
</template>

<script>
import { ref, onMounted } from 'vue'
import obs from '../obs'
import midi from '../midiController'
import gloabls from '../globals'
import fs from 'fs'
import path from 'path'
export default {
    setup() {
        let selectedScene = ref('')
        let scenes = ref(gloabls.scenes)
        let currKey = ref('')
        midi((msg) => {
            if (msg.type == 'note_on') {
                if (selectedScene.value != '') {
                    let scene = scenes.value.find(
                        (s) => s.name == selectedScene.value
                    )
                    scene.keyDisplay = `${msg.note.split('_').join('')} ${
                        msg.controller
                    }`
                    scene.key = msg.note
                    scene.controller = msg.controller
                } else {
                    let scene = scenes.value.find(
                        (s) =>
                            s.key == msg.note && s.controller == msg.controller
                    )
                    if (scene) {
                        obs.send('SetCurrentScene', {
                            'scene-name': scene.name
                        })
                    }
                }
            }
        })
        onMounted(() => {
            loadList()
            obs.on('ScenesChanged', (data) => {
                console.log(data)
                loadList()
            })
        })
        function saveScenes() {
            gloabls.scenes = JSON.parse(JSON.stringify(scenes.value))
            selectedScene.value = ''
            fs.writeFile(
                path.join(__dirname, 'scenes.json'),
                JSON.stringify(scenes.value),
                (err) => {
                    console.error(err)
                }
            )
        }
        async function loadList() {
            let list = await obs.send('GetSceneList')
            scenes.value = list.scenes.map((s, i) => ({
                name: s.name,
                idx: i,
                key: ''
            }))
            selectedScene.value = list['current-scene']
        }

        return {
            selectedScene,
            scenes,
            currKey,
            saveScenes
        }
    }
}
</script>

<style></style>
