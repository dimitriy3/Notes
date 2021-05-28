import router from './router'
import lsApi from './services/ls.api'

router.dispatch('/')

document.body.classList.add(lsApi.getTheme())