import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import "vuetify/_styles.scss"
import { createVuetify } from "vuetify";

import { aliases, mdi } from 'vuetify/iconsets/mdi'
import '@mdi/font/css/materialdesignicons.css';

import * as components from "vuetify/components";
import * as directives from 'vuetify/directives';
import { ru }  from 'vuetify/locale';

const vuetify = createVuetify({
    components, directives,
    icons: {
        defaultSet: 'mdi',
        aliases,
        sets: {
            mdi,
        },
    },
    locale: {
        locale: 'ru',
        fallback: 'ru',
        messages: { ru },
    },
    // theme: {
    //     defaultTheme: 'dark'
    // }
})

createApp(App).use(vuetify).mount('#app')
