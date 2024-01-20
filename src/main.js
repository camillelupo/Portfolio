import {createApp} from 'vue'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.min.css';
import router from '@/router/router.js';
import {createI18n} from 'vue-i18n'



const messages = {
    fr: {
        message: {
            details: 'Developpeur , passionné par les nouvelles technologies et la culture japonaise.'
        }
    },
    en: {
        message: {
            details: 'Developer based in France , passionate by new technology and japanese culture.'
        }
    },
    ja: {
        message: {
            details: '私はフランス出身のソフトウェア開発者で、新しいテクノロジーと日本の文化が大好きです。'
        }
    }
}

const i18n = createI18n({
    locale: 'en', // set locale
    fallbackLocale: 'en', // set fallback locale
    messages, // set locale messages
    // If you need to specify other options, you can set other options
    // ...
})
const app = createApp(App);

app.use(i18n)
app.use(router);
app.mount('#app');