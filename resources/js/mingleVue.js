import {createApp} from 'vue/dist/vue.esm-bundler'

const createComponent = (mingleId, wireId, component, options = { autoMount: true }) => {

    const
        el = document.getElementById(mingleId),
        wire = window.Livewire.find(wireId)

    if (!el) {
        return
    }

    if (el.__vue_app__) {
        return
    }

    let mingleData = {}
    if (el.dataset.mingleData) {
        mingleData = JSON.parse(el.dataset.mingleData)
    }

    let mingleBoot = {}
    if (el.dataset.mingleBoot) {
        mingleBoot = JSON.parse(el.dataset.mingleBoot)
    }

    let props = {}

    if (! mingleBoot.stopHydrateData === true) {
        props = {
            wire, wireId, mingleData,
        }
    }

    const app = createApp(component, props)

    if (options.autoMount) {
        app.mount(el)
    }

    return {
        app,
        node: el,
        mingleData,
    }
}

const registerVueMingle = (name, component) => {
    window.Mingle = window.Mingle || {
        Elements: {}
    }

    window.Mingle.Elements[name] = {
        boot(mingleId, wireId) {
            createComponent(mingleId, wireId, component)
        }
    }
}

export default registerVueMingle
